defmodule SeedRaid.Mixfile do
  use Mix.Project

  def project do
    [
      app: :seed_raid,
      version: "0.0.1",
      elixir: "~> 1.4",
      elixirc_paths: elixirc_paths(Mix.env()),
      compilers: [:phoenix, :gettext] ++ Mix.compilers(),
      start_permanent: Mix.env() == :prod,
      aliases: aliases(),
      deps: deps()
    ]
  end

  # Configuration for the OTP application.
  #
  # Type `mix help compile.app` for more information.
  def application do
    [
      mod: {SeedRaid.Application, []},
      extra_applications: [:timex_ecto, :logger, :runtime_tools]
    ]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "test/support"]
  defp elixirc_paths(_), do: ["lib"]

  # Specifies your project dependencies.
  #
  # Type `mix help deps` for examples and options.
  defp deps do
    [
      {:phoenix, github: "phoenixframework/phoenix", override: true},
      {:phoenix_pubsub, "~> 1.0"},
      {:phoenix_ecto, "~> 3.2"},
      {:postgrex, ">= 0.0.0"},
      {:phoenix_html, "~> 2.10"},
      {:phoenix_live_reload, "~> 1.0", only: :dev},
      {:gettext, "~> 0.11"},
      {:timex, "~> 3.0"},
      {:timex_ecto, "~> 3.0"},
      {:cowboy, "~> 2.2.2", override: true},
      {:plug, "1.5.0-rc.0", override: true},
      {:cowlib, "~> 2.1", override: true},
      {:ranch, "~> 1.4", override: true},
      {:seed_parser, github: "wow-sweetlie/seedparser"},
      {:nostrum, git: "https://github.com/Kraigie/nostrum.git"},
      {:gun,
       git: "https://github.com/ninenines/gun.git",
       ref: "dd1bfe4d6f9fb277781d922aa8bbb5648b3e6756",
       override: true},
      {:ecto_enum, "~> 1.1"}
    ]
  end

  # Aliases are shortcuts or tasks specific to the current project.
  # For example, to create, migrate and run the seeds file at once:
  #
  #     $ mix ecto.setup
  #
  # See the documentation for `Mix` for more info on aliases.
  defp aliases do
    [
      "ecto.setup": ["ecto.create", "ecto.migrate", "run priv/repo/seeds.exs"],
      "ecto.reset": ["ecto.drop", "ecto.setup"],
      test: ["ecto.create --quiet", "ecto.migrate", "test"]
    ]
  end
end
