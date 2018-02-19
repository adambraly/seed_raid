defmodule SeedRaid.DiscordTest do
  use SeedRaid.DataCase

  alias SeedRaid.Discord
  alias SeedRaid.Discord.Member

  @valid_attrs %{
    avatar: "avatar",
    discriminator: 1234,
    nick: "nick",
    username: "username",
    discord_id: 1
  }

  @update_attrs %{
    avatar: "avatar",
    discriminator: 1234,
    nick: "new nick",
    username: "username",
    discord_id: 1
  }

  test "create_or_update with valid data updates the raid" do
    assert {:ok, %Member{} = member} = Discord.create_or_update_member(@valid_attrs)
    assert member.avatar == "avatar"
    assert member.discriminator == 1234
    assert member.nick == "nick"
    assert member.username == "username"
    assert member.discord_id == 1

    assert {:ok, %Member{} = member} = Discord.create_or_update_member(@update_attrs)
    assert member.avatar == "avatar"
    assert member.discriminator == 1234
    assert member.nick == "new nick"
    assert member.username == "username"
    assert member.discord_id == 1
  end
end
