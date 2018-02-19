defmodule SeedRaid.Repo.Migrations.CreateMembers do
  use Ecto.Migration

  def change do
    create table(:members, primary_key: false) do
      add(:discord_id, :bigserial, primary_key: true)
      add(:bot, :boolean, default: false, null: false)
      add(:nick, :string)
      add(:username, :string)
      add(:discriminator, :integer)
      add(:avatar, :string)
    end
  end
end
