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
    participants: nil,
    author_id: 345
  }

  @eu_alliance_raid %{
    seeds: 42,
    when: "2010-04-17 14:00:00.000000Z",
    channel_slug: "eu-alliance",
    discord_id: 2,
    content: "eu-alliance",
    type: :starlight_rose,
    participants: nil,
    author_id: 345
  }

  @updated_raid %{
    seeds: 40,
    when: "2010-04-17 14:00:00.000000Z",
    channel_slug: "eu-alliance",
    discord_id: 2,
    content: "updated_content",
    type: :starlight_rose,
    participants: nil,
    author_id: 345
  }

  @new_eu_alliance_raid %{
    seeds: 42,
    when: "2010-04-17 14:00:00.000000Z",
    channel_slug: "eu-alliance",
    discord_id: 3,
    content: "new-raid",
    type: :starlight_rose,
    participants: nil,
    author_id: 345
  }

  @valid_user %{
    avatar: "avatar",
    discriminator: 1234,
    nick: "nick",
    username: "username",
    discord_id: 345
  }

  def raid_fixture(attrs \\ %{}) do
    {:ok, raid} =
      attrs
      |> Enum.into(@eu_alliance_raid)
      |> Calendar.create_raid()

    raid
  end

  def member_fixture(attrs \\ %{}) do
    {:ok, raid} =
      attrs
      |> Enum.into(@valid_user)
      |> SeedRaid.Discord.create_or_update_member()

    raid
  end

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

  test "update raid when we add member", %{socket: socket} do
    member = member_fixture()
    member2 = member_fixture(discord_id: 1111)
    raid = raid_fixture()

    assert {:ok, _reply, _socket} = subscribe_and_join(socket, "raids")
    Calendar.add_members_to_raid_roster(raid.discord_id, [member.discord_id, member2.discord_id])
    RaidChannel.update_raid(raid.discord_id)

    assert_broadcast("update_raid", %{
      id: 2,
      content: "eu-alliance",
      roster: [
        %{avatar: "avatar", discriminator: 1234, id: "345", nick: "nick", username: "username"},
        %{avatar: "avatar", discriminator: 1234, id: "1111", nick: "nick", username: "username"}
      ]
    })
  end

  test "update raid", %{socket: socket} do
    assert {:ok, %Raid{}} = Calendar.create_raid(@eu_horde_raid)
    assert {:ok, %Raid{}} = Calendar.create_raid(@eu_alliance_raid)
    assert {:ok, _reply, _socket} = subscribe_and_join(socket, "raids")

    assert {:ok, %Raid{} = raid} = Calendar.create_or_update_raid(@updated_raid)

    RaidChannel.update_raid(raid.discord_id)

    assert_broadcast("update_raid", %{
      id: 2,
      content: "updated_content"
    })
  end
end
