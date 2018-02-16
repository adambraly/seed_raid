defmodule SeedRaidWeb.RaidChannel do
  use Phoenix.Channel

  alias SeedRaid.Calendar

  def join("raids", _message, socket) do
    raids = Calendar.list_raids()
    {:ok, %{raids: raids}, socket}
  end

  def update_clients() do
    raids = Calendar.list_raids()
    SeedRaidWeb.Endpoint.broadcast("raids", "raids:update", raids)
  end
end
