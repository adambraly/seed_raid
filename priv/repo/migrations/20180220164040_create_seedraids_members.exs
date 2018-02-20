defmodule SeedRaid.Repo.Migrations.CreateSeedraidsMembers do
  use Ecto.Migration

  def change do
    create table(:seedraids_members, primary_key: false) do
      add(
        :seedraid_id,
        references(:seedraids, column: :discord_id, on_delete: :delete_all),
        primary_key: true
      )

      add(
        :member_id,
        references(:members, column: :discord_id, on_delete: :delete_all),
        primary_key: true
      )
    end
  end
end
