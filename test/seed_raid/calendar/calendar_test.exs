defmodule SeedRaid.CalendarTest do
  use SeedRaid.DataCase

  alias SeedRaid.Calendar

  describe "raids" do
    alias SeedRaid.Calendar.Raid

    @valid_attrs %{
      participants: 42,
      size: 42,
      title: "some title",
      when: "2010-04-17 14:00:00.000000Z",
      side: :alliance,
      region: :eu,
      discord_id: 123
    }
    @update_attrs %{
      participants: 43,
      size: 43,
      title: "some updated title",
      when: "2011-05-18 15:01:01.000000Z",
      side: :alliance,
      region: :eu,
      discord_id: 123
    }
    @invalid_attrs %{participants: nil, size: nil, title: nil, when: nil}

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
      assert raid.participants == 42
      assert raid.size == 42
      assert raid.title == "some title"
      assert raid.when == DateTime.from_naive!(~N[2010-04-17 14:00:00.000000Z], "Etc/UTC")
    end

    test "create_raid/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Calendar.create_raid(@invalid_attrs)
    end

    test "update_raid/2 with valid data updates the raid" do
      raid = raid_fixture()
      assert {:ok, raid} = Calendar.update_raid(raid, @update_attrs)
      assert %Raid{} = raid
      assert raid.participants == 43
      assert raid.size == 43
      assert raid.title == "some updated title"
      assert raid.when == DateTime.from_naive!(~N[2011-05-18 15:01:01.000000Z], "Etc/UTC")
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
  end
end
