defmodule Discord.MemberTest do
  use SeedRaid.DataCase

  alias SeedRaid.Discord.Member

  @valid_attrs %{
    avatar: "avatar",
    discriminator: 1234,
    nick: "nick",
    username: "username",
    discord_id: 1
  }

  test "delete the member" do
    assert {:ok, %Member{}} = SeedRaid.Discord.create_or_update_member(@valid_attrs)
    assert SeedRaid.Discord.all_members() |> Enum.count() == 1
    Discord.Member.delete(%{user: %{id: 1}})
    assert SeedRaid.Discord.all_members() |> Enum.count() == 0
  end
end
