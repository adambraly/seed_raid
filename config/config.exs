# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :seed_raid,
  ecto_repos: [SeedRaid.Repo],
  generators: [binary_id: true]

# Configures the endpoint
config :seed_raid, SeedRaidWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "YesnXHwM6CCRI+QZfJFQzyMRm01bj9rMtrlbp0NLDbFS8YopczIn7p/70J9v+RI4",
  render_errors: [view: SeedRaidWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: SeedRaid.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :sentry,
  dsn: System.get_env("SENTRY_DSN"),
  included_environments: [:prod],
  environment_name: Mix.env()

config :nostrum, num_shards: :auto
# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
