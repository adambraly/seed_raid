defmodule SeedRaidWeb.RaidController do
  use SeedRaidWeb, :controller

  alias SeedRaid.Calendar
  alias SeedRaid.Calendar.Raid

  action_fallback(SeedRaidWeb.FallbackController)

  def index(conn, _params) do
    raids = Calendar.list_raids()
    render(conn, "index.json", raids: raids)
  end

  def create(conn, %{"raid" => raid_params}) do
    with {:ok, %Raid{} = raid} <- Calendar.create_raid(raid_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", raid_path(conn, :show, raid))
      |> render("show.json", raid: raid)
    end
  end

  def show(conn, %{"id" => id}) do
    raid = Calendar.get_raid!(id)
    render(conn, "show.json", raid: raid)
  end

  def update(conn, %{"id" => id, "raid" => raid_params}) do
    raid = Calendar.get_raid!(id)

    with {:ok, %Raid{} = raid} <- Calendar.update_raid(raid, raid_params) do
      render(conn, "show.json", raid: raid)
    end
  end

  def delete(conn, %{"id" => id}) do
    raid = Calendar.get_raid!(id)

    with {:ok, %Raid{}} <- Calendar.delete_raid(raid) do
      send_resp(conn, :no_content, "")
    end
  end
end
