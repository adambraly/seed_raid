defmodule SeedRaidWeb.RaidChannel do
  use Phoenix.Channel

  alias SeedRaid.Calendar

  def join("raids", _message, socket) do
    raids = Calendar.list_raids()

    {:ok, %{raids: raids}, socket}
  end

  def encode(raid) do
    %{
      id: raid.id,
      when: raid.when |> Timex.format!("{ISO:Extended:Z}"),
      region: raid.region,
      side: raid.side,
      type: raid.type |> Atom.to_string() |> String.replace("_", "-"),
      seeds: raid.seeds,
      content: raid.content
    }
  end

  def update_clients() do
    # raids = Calendar.list_raids()
    # SeedRaidWeb.Endpoint.broadcast("raids", "raids:update", raids)
  end
end
