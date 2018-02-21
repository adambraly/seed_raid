defmodule SeedRaid.Repo.Migrations.AddParticipantsToSeedraids do
  use Ecto.Migration

  def change do
    alter table(:seedraids) do
      add(:participants, :integer)
    end
  end
end
