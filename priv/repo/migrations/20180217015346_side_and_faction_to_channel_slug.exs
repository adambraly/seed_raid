defmodule SeedRaid.Repo.Migrations.SideAndFactionToChannelSlug do
  use Ecto.Migration

  def change do
    alter table(:seedraids) do
      remove(:side)
      remove(:region)
      add(:channel_slug, :string, null: false)
    end

    create(index(:seedraids, [:channel_slug]))
  end
end
