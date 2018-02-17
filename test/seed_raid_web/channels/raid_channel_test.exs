defmodule SeedRaidWeb.RaidChannelTest do
  use SeedRaidWeb.ChannelCase
  alias SeedRaid.Calendar
  alias SeedRaid.Calendar.Raid
  alias SeedRaidWeb.RaidChannel

  @eu_horde_raid %{
    seeds: 42,
    when: "2010-04-17 14:00:00.000000Z",
    channel_slug: "eu-horde",
    discord_id: 1,
    content: "eu-horde",
    type: :starlight_rose,
    author_id: 345
  }

  @eu_alliance_raid %{
    seeds: 42,
    when: "2010-04-17 14:00:00.000000Z",
    channel_slug: "eu-alliance",
    discord_id: 2,
    content: "eu-alliance",
    type: :starlight_rose,
    author_id: 345
  }

  @updated_raid %{
    seeds: 40,
    when: "2010-04-17 14:00:00.000000Z",
    channel_slug: "eu-alliance",
    discord_id: 2,
    content: "updated_content",
    type: :starlight_rose,
    author_id: 345
  }

  @new_eu_alliance_raid %{
    seeds: 42,
    when: "2010-04-17 14:00:00.000000Z",
    channel_slug: "eu-alliance",
    discord_id: 3,
    content: "new-raid",
    type: :starlight_rose,
    author_id: 345
  }

  setup do
    {:ok, socket} = connect(SeedRaidWeb.UserSocket, %{})

    {:ok, socket: socket}
  end

  test "join raids when there is no raids", %{socket: socket} do
    assert {:ok, reply, _socket} = subscribe_and_join(socket, "raids")

    assert %{
             raids: %{
               "eu-alliance" => [],
               "eu-horde" => [],
               "na-alliance" => [],
               "na-horde" => []
             }
           } == reply
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

  test "sync change", %{socket: socket} do
    assert {:ok, %Raid{}} = Calendar.create_raid(@eu_horde_raid)
    assert {:ok, %Raid{}} = Calendar.create_raid(@eu_alliance_raid)
    assert {:ok, _reply, _socket} = subscribe_and_join(socket, "raids")

    assert {:ok, %Raid{}} = Calendar.create_raid(@new_eu_alliance_raid)

    RaidChannel.sync_channel("eu-alliance")

    assert_broadcast("sync_channel", %{
      channel_slug: "eu-alliance",
      raids: [%{content: "new-raid"}, %{content: "eu-alliance"}]
    })
  end

  test "update raid", %{socket: socket} do
    assert {:ok, %Raid{}} = Calendar.create_raid(@eu_horde_raid)
    assert {:ok, %Raid{}} = Calendar.create_raid(@eu_alliance_raid)
    assert {:ok, _reply, _socket} = subscribe_and_join(socket, "raids")

    assert {:ok, %Raid{} = raid} = Calendar.create_or_update_raid(@updated_raid)

    RaidChannel.update_raid(raid)

    assert_broadcast("update_raid", %{
      discord_id: 2,
      content: "updated_content"
    })
  end
end
