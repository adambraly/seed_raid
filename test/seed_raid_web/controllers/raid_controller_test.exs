defmodule SeedRaidWeb.RaidControllerTest do
  use SeedRaidWeb.ConnCase

  alias SeedRaid.Calendar
  alias SeedRaid.Calendar.Raid

  @create_attrs %{
    seeds: 42,
    title: "some title",
    when: "2010-04-17 14:00:00.000000Z",
    side: :alliance,
    region: :eu,
    discord_id: 123,
    content: "content...",
    type: :starlight_rose,
    author_id: 345
  }
  @update_attrs %{
    seeds: 43,
    when: "2011-05-18 15:01:01.000000Z",
    side: :alliance,
    region: :eu,
    discord_id: 123,
    content: "updated content...",
    type: :starlight_rose,
    author_id: 345
  }
  @invalid_attrs %{participants: nil, size: nil, title: nil, when: nil}

  def fixture(:raid) do
    {:ok, raid} = Calendar.create_raid(@create_attrs)
    raid
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all raids", %{conn: conn} do
      conn = get(conn, raid_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create raid" do
    test "renders raid when data is valid", %{conn: conn} do
      conn = post(conn, raid_path(conn, :create), raid: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, raid_path(conn, :show, id))

      assert json_response(conn, 200)["data"] == %{
               "id" => id,
               "seeds" => 42,
               "content" => "content...",
               "when" => "2010-04-17T14:00:00Z",
               "type" => "starlight-rose",
               "side" => "alliance",
               "region" => "eu"
             }
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, raid_path(conn, :create), raid: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update raid" do
    setup [:create_raid]

    test "renders raid when data is valid", %{conn: conn, raid: %Raid{id: id} = raid} do
      conn = put(conn, raid_path(conn, :update, raid), raid: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, raid_path(conn, :show, id))

      assert json_response(conn, 200)["data"] == %{
               "id" => id,
               "seeds" => 43,
               "content" => "updated content...",
               "type" => "starlight-rose",
               "when" => "2011-05-18T15:01:01Z",
               "side" => "alliance",
               "region" => "eu"
             }
    end

    test "renders errors when data is invalid", %{conn: conn, raid: raid} do
      conn = put(conn, raid_path(conn, :update, raid), raid: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete raid" do
    setup [:create_raid]

    test "deletes chosen raid", %{conn: conn, raid: raid} do
      conn = delete(conn, raid_path(conn, :delete, raid))
      assert response(conn, 204)

      assert_error_sent(404, fn ->
        get(conn, raid_path(conn, :show, raid))
      end)
    end
  end

  defp create_raid(_) do
    raid = fixture(:raid)
    {:ok, raid: raid}
  end
end
