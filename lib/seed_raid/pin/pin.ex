defmodule SeedRaid.Pin do
  alias SeedRaid.Pin.{Blacklist, Error}
  alias SeedRaid.Repo

  import Ecto.Query, warn: false

  def reject_blacklisted(pins) do
    blacklist =
      Blacklist
      |> Repo.all()
      |> Enum.map(fn blacklisted -> {blacklisted.discord_id, true} end)
      |> Enum.into(%{})

    pins
    |> Enum.reject(fn %{id: id} -> blacklist |> Map.has_key?(id) end)
  end

  def is_blacklisted?(pin) do
    case from(b in Blacklist, where: b.discord_id == ^pin.id)
         |> Repo.one() do
      %Blacklist{} ->
        true

      _ ->
        false
    end
  end

  def add_to_blacklist(id) do
    %Blacklist{}
    |> Blacklist.changeset(%{discord_id: id})
    |> Repo.insert()
  end

  def get_error(id) do
    from(err in Error, where: err.discord_id == ^id)
    |> Repo.one()
  end

  def insert_error(id, missing) do
    changeset =
      missing
      |> Enum.map(fn field -> {field, true} end)
      |> Enum.into(%{})
      |> Map.put(:discord_id, id)

    %Error{}
    |> Error.changeset(changeset)
    |> Repo.insert()
  end

  def error_already_logged?(id) do
    case get_error(id) do
      err when is_map(err) ->
        true

      _ ->
        false
    end
  end
end
