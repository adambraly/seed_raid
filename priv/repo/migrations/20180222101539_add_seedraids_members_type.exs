defmodule SeedRaid.Repo.Migrations.AddSeedraidsMembersType do
  use Ecto.Migration

  def change do
    alter table(:seedraids_members) do
      add(:type, :string, default: "roster")
    end
  end
end
