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

  @user_fixture %Nostrum.Struct.Guild.Member{
    deaf: false,
    joined_at: "2018-02-23T01:20:26.056145+00:00",
    mute: false,
    nick: nil,
    roles: [],
    user: %Nostrum.Struct.User{
      avatar: "80bda59d895805f7af3532c05cc50da1",
      bot: nil,
      discriminator: "9527",
      email: nil,
      id: 189_452_816_379_674_624,
      mfa_enabled: nil,
      username: "Shadow, Monk",
      verified: nil
    }
  }

  test "delete the member" do
    assert {:ok, %Member{}} = SeedRaid.Discord.create_or_update_member(@valid_attrs)
    assert SeedRaid.Discord.all_members() |> Enum.count() == 1
    Discord.Member.delete(%{user: %{id: 1}})
    assert SeedRaid.Discord.all_members() |> Enum.count() == 0
  end

  test "add member" do
    Discord.Member.add(@user_fixture)
    {:ok, member} = SeedRaid.Discord.get_member(@user_fixture.user.id)
    assert member.discord_id == @user_fixture.user.id
  end
end
