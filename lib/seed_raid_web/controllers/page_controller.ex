defmodule SeedRaidWeb.PageController do
  use SeedRaidWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
