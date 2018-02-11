defmodule SeedRaid.Pin do
  alias SeedRaid.Pin.Blacklist
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
end
