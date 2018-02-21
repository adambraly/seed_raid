defmodule SeedRaid.RaidTests do
  use SeedRaid.DataCase

  require Logger

  alias SeedRaid.Calendar

  describe "raids" do
    alias SeedRaid.Calendar.Raid

    @datetime {{2010, 04, 17}, {12, 00, 00}}

    @valid_attrs %{
      seeds: 42,
      when: Timex.to_datetime(@datetime),
      channel_slug: "eu-alliance",
      discord_id: 123,
      author_id: 345,
      type: :mix,
      content: "raid...",
      pinned: true
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
        |> Enum.into(@valid_attrs)
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

    test "postporcess_body" do
      member = member_fixture()
      raid = raid_fixture(content: "nick: <@!345>. username: <@345>")
      Calendar.add_members_to_raid(raid.discord_id, [member.discord_id])
      raid = Calendar.get_raid!(raid.discord_id)

      raid = raid |> Raid.postprocess_content()

      assert raid.content == "nick: nick. username: nick"
    end
  end
end
