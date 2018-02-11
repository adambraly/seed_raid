use Mix.Config

# For production, we often load configuration from external
# sources, such as your system environment. For this reason,
# you won't find the :http configuration below, but set inside
# SeedRaidWeb.Endpoint.init/2 when load_from_system_env is
# true. Any dynamic configuration should be done there.
#
# Don't forget to configure the url host to something meaningful,
# Phoenix uses this information when generating URLs.
#
# Finally, we also include the path to a cache manifest
# containing the digested version of static files. This
# manifest is generated by the mix phx.digest task
# which you typically run after static files are built.
config :seed_raid, SeedRaidWeb.Endpoint,
  load_from_system_env: true,
  url: [host: "example.com", port: 80],
  cache_static_manifest: "priv/static/cache_manifest.json"

# Do not print debug messages in production
config :logger, level: :info

# ## SSL Support
#
# To get SSL working, you will need to add the `https` key
# to the previous section and set your `:url` port to 443:
#
#     config :seed_raid, SeedRaidWeb.Endpoint,
#       ...
#       url: [host: "example.com", port: 443],
#       https: [:inet6,
#               port: 443,
#               keyfile: System.get_env("SOME_APP_SSL_KEY_PATH"),
#               certfile: System.get_env("SOME_APP_SSL_CERT_PATH")]
#
# Where those two env variables return an absolute path to
# the key and cert in disk or a relative path inside priv,
# for example "priv/ssl/server.key".
#
# We also recommend setting `force_ssl`, ensuring no data is
# ever sent via http, always redirecting to https:
#
#     config :seed_raid, SeedRaidWeb.Endpoint,
#       force_ssl: [hsts: true]
#
# Check `Plug.SSL` for all available options in `force_ssl`.

# ## Using releases
#
# If you are doing OTP releases, you need to instruct Phoenix
# to start the server for all endpoints:
#
#     config :phoenix, :serve_endpoints, true
#
# Alternatively, you can configure exactly which server to
# start per endpoint:
#
#     config :seed_raid, SeedRaidWeb.Endpoint, server: true
#

# Finally import the config/prod.secret.exs
# which should be versioned separately.
config :logger, level: :debug

config :seed_raid, :guild, 248_859_295_414_878_208

config :seed_raid, :channels, %{
  248_861_585_811_046_410 => %{region: :eu, side: :alliance},
  248_861_600_998_621_184 => %{region: :eu, side: :horde},
  248_901_465_291_096_064 => %{region: :na, side: :alliance},
  248_861_564_008_923_147 => %{region: :na, side: :horde}
}

config :nostrum, token: "${DISCORD_TOKEN}"

config :seed_raid, SeedRaidWeb.Endpoint, secret_key_base: {:system, "SECRET_KEY_BASE"}

# Configure your database
config :seed_raid, SeedRaid.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: {:system, "DB_USER", "seedraid"},
  password: {:system, "DB_PASSWORD"},
  database: "seed_raid_prod",
  pool_size: 15
