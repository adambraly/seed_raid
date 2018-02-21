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

  def encode(%SeedRaid.Calendar.Raid{} = raid) do
    raid = raid |> SeedRaid.Calendar.Raid.postprocess_content()

    %{
      id: raid.discord_id,
      author: encode(raid.author),
      when: raid.when |> Timex.format!("{ISO:Extended:Z}"),
      channel_slug: raid.channel_slug,
      type: raid.type |> Atom.to_string() |> String.replace("_", "-"),
      seeds: raid.seeds,
      content: raid.content
    }
  end

  def encode(%SeedRaid.Discord.Member{} = member) do
    %{
      id: member.discord_id |> Integer.to_string(),
      avatar: member.avatar,
      nick: member.nick,
      discriminator: member.discriminator,
      username: member.username
    }
  end

  def encode(_) do
    nil
  end

  def update_raid(raid) do
    payload = Calendar.get_raid!(raid.discord_id) |> encode

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
