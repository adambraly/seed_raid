defmodule SeedRaid.Discord do
  import Ecto.Query, warn: false
  alias SeedRaid.Repo
  require Logger

  alias SeedRaid.Discord.Member

  def all_members() do
    Member
    |> Repo.all()
  end

  def create_or_update_member(attrs) do
    %Member{}
    |> Member.changeset(attrs)
    |> Repo.insert(
      on_conflict: [
        set: [
          avatar: attrs.avatar,
          discriminator: attrs.discriminator,
          nick: attrs.nick,
          username: attrs.username
        ]
      ],
      conflict_target: :discord_id
    )
  end

  def delete_member(member) do
    member
    |> Repo.delete()
  end

  def get_member(id) do
    member =
      Member
      |> where(discord_id: ^id)
      |> Repo.one()

    case member do
      nil -> {:error, :notfound}
      member -> {:ok, member}
    end
  end

  def add_members(members) do
    Member
    |> Repo.insert_all(
      members,
      on_conflict: :replace_all,
      conflict_target: :discord_id
    )
  end
end
