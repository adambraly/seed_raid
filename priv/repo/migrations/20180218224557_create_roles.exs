defmodule SeedRaid.Repo.Migrations.CreateRoles do
  use Ecto.Migration

  def change do
    create table(:roles, primary_key: false) do
      add(:id, :binary_id, primary_key: true)
      add(:discord_id, :bigserial, null: false)
      add(:name, :string, null: false)
      add(:hoist, :boolean, default: false, null: false)
      add(:position, :integer, null: false)

      timestamps()
    end

    create(unique_index(:roles, [:discord_id]))
  end
end
