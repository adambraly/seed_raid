defmodule SeedRaid.CalendarTest do
  use SeedRaid.DataCase

  alias SeedRaid.Calendar

  describe "raids" do
    alias SeedRaid.Calendar.Raid

    @datetime {{2010, 04, 17}, {12, 00, 00}}
    @updated_datetime {{2011, 04, 17}, {12, 00, 00}}

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
    @update_attrs %{
      seeds: 43,
      when: Timex.to_datetime(@datetime),
      channel_slug: "eu-alliance",
      discord_id: 123,
      author_id: 345,
      type: :mix,
      content: "updated raid...",
      pinned: true
    }
    @create_update_attrs %{
      seeds: 45,
      when: Timex.to_datetime(@updated_datetime),
      channel_slug: "eu-alliance",
      discord_id: 123,
      author_id: 345,
      type: :mix,
      content: "updated raid...",
      pinned: true
    }
    @invalid_attrs %{size: nil, date: nil, when: nil}

    def raid_fixture(attrs \\ %{}) do
      {:ok, raid} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Calendar.create_raid()

      raid
    end

    test "list_raids/0 returns all raids" do
      raid = raid_fixture()
      assert Calendar.list_raids() == [raid]
    end

    test "get_raid!/1 returns the raid with given id" do
      raid = raid_fixture()
      assert Calendar.get_raid!(raid.id) == raid
    end

    test "create_raid/1 with valid data creates a raid" do
      assert {:ok, %Raid{} = raid} = Calendar.create_raid(@valid_attrs)
      assert raid.seeds == 42
      assert raid.when == Timex.to_datetime({{2010, 04, 17}, {12, 00, 00}})
      assert raid.content == "raid..."
      assert raid.author_id == 345
      assert raid.pinned == true
    end

    test "create_raid/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Calendar.create_raid(@invalid_attrs)
    end

    test "update_raid/2 with valid data updates the raid" do
      raid = raid_fixture()
      assert {:ok, raid} = Calendar.update_raid(raid, @update_attrs)
      assert %Raid{} = raid
      assert raid.seeds == 43
      assert raid.content == "updated raid..."
      assert raid.author_id == 345

      assert raid.when == Timex.to_datetime({{2010, 04, 17}, {12, 00, 00}})
      assert(raid.type == :mix)
    end

    test "create_or_update with valid data updates the raid" do
      assert {:ok, %Raid{} = raid} = Calendar.create_or_update_raid(@valid_attrs)
      assert raid.seeds == 42
      assert raid.content == "raid..."
      assert raid.author_id == 345
      assert raid.channel_slug == "eu-alliance"

      assert raid.when == Timex.to_datetime({{2010, 04, 17}, {12, 00, 00}})
      assert(raid.type == :mix)

      assert {:ok, %Raid{}} = Calendar.create_or_update_raid(@create_update_attrs)
      saved_raid = Calendar.get_raid!(raid.id)
      assert %Raid{} = saved_raid
      assert saved_raid.seeds == 45
      assert saved_raid.content == "updated raid..."
      assert saved_raid.channel_slug == "eu-alliance"
      assert saved_raid.when == Timex.to_datetime({{2011, 04, 17}, {12, 00, 00}})
    end

    test "update_raid/2 with invalid data returns error changeset" do
      raid = raid_fixture()
      assert {:error, %Ecto.Changeset{}} = Calendar.update_raid(raid, @invalid_attrs)
      assert raid == Calendar.get_raid!(raid.id)
    end

    test "delete_raid/1 deletes the raid" do
      raid = raid_fixture()
      assert {:ok, %Raid{}} = Calendar.delete_raid(raid)
      assert_raise Ecto.NoResultsError, fn -> Calendar.get_raid!(raid.id) end
    end

    test "change_raid/1 returns a raid changeset" do
      raid = raid_fixture()
      assert %Ecto.Changeset{} = Calendar.change_raid(raid)
    end

    test "unpin_all/2 unpin all raid from a channel" do
      raid_attrs =
        @valid_attrs
        |> Map.put(:channel_slug, "eu-alliance")
        |> Map.put(:discord_id, 1)

      assert {:ok, %Raid{id: to_unpin_id}} = Calendar.create_or_update_raid(raid_attrs)

      raid_attrs =
        @valid_attrs
        |> Map.put(:channel_slug, "eu-alliance")
        |> Map.put(:discord_id, 2)

      assert {:ok, %Raid{}} = Calendar.create_or_update_raid(raid_attrs)

      raid_attrs =
        @valid_attrs
        |> Map.put(:channel_slug, "eu-horde")
        |> Map.put(:discord_id, 3)

      assert {:ok, %Raid{id: other_channel_raid_id}} = Calendar.create_or_update_raid(raid_attrs)

      raid_attrs =
        @valid_attrs
        |> Map.put(:channel_slug, "eu-alliance")
        |> Map.put(:discord_id, 5)
        |> Map.put(:pinned, false)

      assert {:ok, %Raid{}} = Calendar.create_or_update_raid(raid_attrs)

      inserted_raid_count = Calendar.list_raids() |> Enum.count()

      assert inserted_raid_count == 3

      assert Calendar.unpin_all("eu-alliance") == 2

      always_pinned = Calendar.get_raid!(other_channel_raid_id)
      assert always_pinned.pinned == true

      unpinned = Calendar.get_raid!(to_unpin_id)
      assert unpinned.pinned == false
    end
  end
end
