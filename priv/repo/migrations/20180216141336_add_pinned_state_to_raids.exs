defmodule SeedRaid.Repo.Migrations.AddPinnedStateToRaids do
  use Ecto.Migration

  def change do
    alter table(:seedraids) do
      add(:pinned, :boolean, default: true)
    end

    create(index(:seedraids, [:pinned]))
  end
end
