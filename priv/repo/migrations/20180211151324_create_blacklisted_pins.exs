defmodule SeedRaid.Repo.Migrations.CreateBlacklistedPins do
  use Ecto.Migration

  def change do
    create table(:blacklisted_pins, primary_key: false) do
      add(:discord_id, :bigserial, primary_key: true)
    end
  end
end
