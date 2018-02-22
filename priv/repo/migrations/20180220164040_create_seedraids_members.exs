defmodule SeedRaid.Repo.Migrations.CreateSeedraidsMembers do
  use Ecto.Migration

  def change do
    create table(:registrations, primary_key: false) do
      add(
        :raid_id,
        references(:seedraids, column: :discord_id, on_delete: :delete_all),
        primary_key: true
      )

      add(
        :member_id,
        references(:members, column: :discord_id, on_delete: :delete_all),
        primary_key: true
      )

      add(:type, :string, default: "roster")
    end
  end
end
