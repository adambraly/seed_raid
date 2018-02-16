defmodule SeedRaid.Repo.Migrations.AddWhenIndexToRaids do
  use Ecto.Migration

  def change do
    create(index(:seedraids, [:when]))
  end
end
