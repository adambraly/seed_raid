defmodule SeedRaidWeb.RaidChannel do
  use Phoenix.Channel

  alias SeedRaid.Calendar

  def join("raids", _message, socket) do
    raids =
      Calendar.list_raids()
      |> Enum.group_by(fn raid -> raid.channel_slug end)

    {:ok, %{raids: raids}, socket}
  end

  def encode(raid) do
    %{
      id: raid.id,
      when: raid.when |> Timex.format!("{ISO:Extended:Z}"),
      chanel_slug: raid.channel_slug,
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
