defmodule SeedRaid.Calendar do
  @moduledoc """
  The Calendar context.
  """

  import Ecto.Query, warn: false
  alias SeedRaid.Repo
  alias SeedRaid.Calendar.Registration

  alias SeedRaid.Calendar.Raid

  @doc """
  Returns the list of raids.

  ## Examples

      iex> list_raids()
      [%Raid{}, ...]

  """

  def list_raids() do
    Raid
    |> pinned_raid_with_members
    |> order_by(asc: :when)
    |> Repo.all()
  end

  def list_raids_of_channel(slug) do
    Raid
    |> pinned_raid_with_members
    |> where(channel_slug: ^slug)
    |> order_by(asc: :when)
    |> Repo.all()
  end

  defp pinned_raid_with_members(query) do
    query
    |> where(pinned: true)
    |> join(:left, [raid], registrations in assoc(raid, :registrations))
    |> join(:left, [raid, registrations], member in assoc(registrations, :member))
    |> preload([raid, registrations, member], registrations: {registrations, member: member})
  end

  @doc """
   unpin all post from a given channel
  """
  def unpin_all(channel_slug) do
    query = from(r in Raid, where: r.channel_slug == ^channel_slug and r.pinned == true)

    case Repo.update_all(query, set: [pinned: false]) do
      {changed, _} when is_integer(changed) ->
        changed

      _ ->
        0
    end
  end

  @doc """
  Gets a single raid.

  Raises `Ecto.NoResultsError` if the Raid does not exist.

  ## Examples

      iex> get_raid!(123)
      %Raid{}

      iex> get_raid!(456)
      ** (Ecto.NoResultsError)

  """
  def get_raid!(id) do
    Raid
    |> where(discord_id: ^id)
    |> preload(:author)
    |> preload(:members)
    |> Repo.one!()
  end

  @doc """
  Creates a raid.

  ## Examples

      iex> create_raid(%{field: value})
      {:ok, %Raid{}}

      iex> create_raid(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_raid(attrs \\ %{}) do
    %Raid{}
    |> Raid.changeset(attrs)
    |> Repo.insert()
  end

  def add_members_to_raid_roster(raid_id, members) do
    add_members_to_raid(raid_id, members, "roster")
  end

  def add_members_to_raid_backup(raid_id, members) do
    add_members_to_raid(raid_id, members, "backup")
  end

  defp add_members_to_raid(raid_id, members, type) do
    Registration
    |> where(raid_id: ^raid_id)
    |> Repo.delete_all()

    raids_members =
      members
      |> Enum.map(fn member_id ->
        [member_id: member_id, raid_id: raid_id, type: type]
      end)

    Registration
    |> Repo.insert_all(raids_members)
  end

  def create_or_update_raid(attrs) do
    %Raid{}
    |> Raid.changeset(attrs)
    |> Repo.insert(
      on_conflict: [
        set: [
          when: attrs.when,
          seeds: attrs.seeds,
          type: attrs.type,
          content: attrs.content,
          pinned: true,
          participants: attrs.participants
        ]
      ],
      conflict_target: :discord_id
    )
  end

  @doc """
  Updates a raid.

  ## Examples

      iex> update_raid(raid, %{field: new_value})
      {:ok, %Raid{}}

      iex> update_raid(raid, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_raid(%Raid{} = raid, attrs) do
    raid
    |> Raid.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Raid.

  ## Examples

      iex> delete_raid(raid)
      {:ok, %Raid{}}

      iex> delete_raid(raid)
      {:error, %Ecto.Changeset{}}

  """
  def delete_raid(%Raid{} = raid) do
    Repo.delete(raid)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking raid changes.

  ## Examples

      iex> change_raid(raid)
      %Ecto.Changeset{source: %Raid{}}

  """
  def change_raid(%Raid{} = raid) do
    Raid.changeset(raid, %{})
  end
end
