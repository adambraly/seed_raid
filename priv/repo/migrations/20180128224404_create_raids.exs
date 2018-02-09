defmodule Seedraid.Repo.Migrations.CreateRaids do
  use Ecto.Migration

  def up do
    RaidTypeEnum.create_type()
    SideEnum.create_type()
    RegionEnum.create_type()

    create table(:seedraids, primary_key: false) do
      add(:id, :binary_id, primary_key: true)
      add(:discord_id, :integer, null: false)

      add(:content, :text, null: false)

      add(:side, :side, null: false)
      add(:region, :region, null: false)

      add(:when, :utc_datetime, null: false)

      add(:seeds, :integer)
      add(:type, :raidtype)
      timestamps()
    end
  end

  def down do
    drop(table(:seedraids))
    RaidTypeEnum.drop_type()
    SideEnum.drop_type()
    RegionEnum.drop_type()
  end
end
