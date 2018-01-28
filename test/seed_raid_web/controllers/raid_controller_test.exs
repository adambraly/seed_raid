defmodule SeedRaidWeb.RaidControllerTest do
  use SeedRaidWeb.ConnCase

  alias SeedRaid.Calendar
  alias SeedRaid.Calendar.Raid

  @create_attrs %{participants: 42, size: 42, title: "some title", when: "2010-04-17 14:00:00.000000Z"}
  @update_attrs %{participants: 43, size: 43, title: "some updated title", when: "2011-05-18 15:01:01.000000Z"}
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
      conn = get conn, Routes.raid_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create raid" do
    test "renders raid when data is valid", %{conn: conn} do
      conn = post conn, Routes.raid_path(conn, :create), raid: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, Routes.raid_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "participants" => 42,
        "size" => 42,
        "title" => "some title",
        "when" => "2010-04-17 14:00:00.000000Z"}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, Routes.raid_path(conn, :create), raid: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update raid" do
    setup [:create_raid]

    test "renders raid when data is valid", %{conn: conn, raid: %Raid{id: id} = raid} do
      conn = put conn, Routes.raid_path(conn, :update, raid), raid: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, Routes.raid_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "participants" => 43,
        "size" => 43,
        "title" => "some updated title",
        "when" => "2011-05-18 15:01:01.000000Z"}
    end

    test "renders errors when data is invalid", %{conn: conn, raid: raid} do
      conn = put conn, Routes.raid_path(conn, :update, raid), raid: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete raid" do
    setup [:create_raid]

    test "deletes chosen raid", %{conn: conn, raid: raid} do
      conn = delete conn, Routes.raid_path(conn, :delete, raid)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, Routes.raid_path(conn, :show, raid)
      end
    end
  end

  defp create_raid(_) do
    raid = fixture(:raid)
    {:ok, raid: raid}
  end
end
