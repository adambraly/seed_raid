defmodule SeedRaidWeb.Router do
  use SeedRaidWeb, :router

  pipeline :browser do
    plug(:accepts, ["html"])
    plug(:fetch_session)
    plug(:fetch_flash)
    plug(:protect_from_forgery)
    plug(:put_secure_browser_headers)
  end

  pipeline :api do
    plug(:accepts, ["json"])
  end

  scope "/api", SeedRaidWeb do
    pipe_through(:api)

    resources("/raids", RaidController)
  end

  scope "/", SeedRaidWeb do
    # Use the default browser stack
    pipe_through(:browser)

    get("/*path", PageController, :index)
  end
end
