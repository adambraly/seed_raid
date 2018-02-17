defmodule SeedRaidWeb.RaidChannelTest do
  use SeedRaidWeb.ChannelCase
  alias SeedRaid.Calendar
  alias SeedRaid.Calendar.Raid

  @eu_horde_raid %{
    seeds: 42,
    title: "some title",
    when: "2010-04-17 14:00:00.000000Z",
    channel_slug: "eu-horde",
    discord_id: 1,
    content: "eu-horde",
    type: :starlight_rose,
    author_id: 345
  }

  @eu_alliance_raid %{
    seeds: 42,
    title: "some title",
    when: "2010-04-17 14:00:00.000000Z",
    channel_slug: "eu-alliance",
    discord_id: 2,
    content: "eu-alliance",
    type: :starlight_rose,
    author_id: 345
  }

  setup do
    {:ok, socket} = connect(SeedRaidWeb.UserSocket, %{})

    {:ok, socket: socket}
  end

  test "join raids when there is no raids", %{socket: socket} do
    assert {:ok, reply, _socket} = subscribe_and_join(socket, "raids")
    assert %{raids: %{}} == reply
  end

  test "join raids when there is two raids", %{socket: socket} do
    assert {:ok, %Raid{}} = Calendar.create_raid(@eu_horde_raid)
    assert {:ok, %Raid{}} = Calendar.create_raid(@eu_alliance_raid)
    assert {:ok, reply, _socket} = subscribe_and_join(socket, "raids")

    assert %{
             raids: %{
               "eu-alliance" => [%{content: "eu-alliance"}],
               "eu-horde" => [%{content: "eu-horde"}]
             }
           } = reply
  end
end
