defmodule SeedRaid.Repo.Migrations.CreatePinsErrors do
  use Ecto.Migration

  def change do
    create table(:pins_errors, primary_key: false) do
      add(:id, :binary_id, primary_key: true)
      add(:discord_id, :bigserial, null: false)
      add(:date, :boolean, default: false, null: false)
      add(:time, :boolean, default: false, null: false)
      add(:format, :boolean, default: false, null: false)

      timestamps()
    end

    create(unique_index(:pins_errors, [:discord_id]))
  end
end
