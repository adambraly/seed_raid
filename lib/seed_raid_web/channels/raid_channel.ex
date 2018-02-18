defmodule SeedRaidWeb.RaidChannel do
  use Phoenix.Channel

  alias SeedRaid.Calendar
  alias SeedRaidWeb.Endpoint

  def join("raids", _message, socket) do
    raids =
      Calendar.list_raids()
      |> Enum.map(&encode/1)
      |> Enum.group_by(fn raid -> raid.channel_slug end)
      |> Map.put_new("eu-alliance", [])
      |> Map.put_new("eu-horde", [])
      |> Map.put_new("na-alliance", [])
      |> Map.put_new("na-horde", [])

    {:ok, %{raids: raids}, socket}
  end

  def encode(raid) do
    %{
      id: raid.discord_id,
      when: raid.when |> Timex.format!("{ISO:Extended:Z}"),
      channel_slug: raid.channel_slug,
      type: raid.type |> Atom.to_string() |> String.replace("_", "-"),
      seeds: raid.seeds,
      content: raid.content
    }
  end

  def update_raid(raid) do
    payload = raid |> encode

    Endpoint.broadcast!("raids", "update_raid", payload)
  end

  def sync_channel(slug) do
    raids =
      slug
      |> Calendar.list_raids_of_channel()
      |> Enum.map(&encode/1)

    playload = %{channel_slug: slug, raids: raids}

    Endpoint.broadcast!("raids", "sync_channel", playload)
  end
end
