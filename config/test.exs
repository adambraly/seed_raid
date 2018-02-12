use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :seed_raid, SeedRaidWeb.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :seed_raid, SeedRaid.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "seed_raid_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox

config :seed_raid, :channels, %{
  400_443_211_127_980_044 => %{region: :eu, side: :horde}
}

import_config "test.secret.exs"
