defmodule Seedraid.Repo.Migrations.CreateRaids do
  use Ecto.Migration

  def up do
    RaidTypeEnum.create_type()
    RaidStyleEnum.create_type()
    SideEnum.create_type()
    RegionEnum.create_type()

    create table(:seedraids, primary_key: false) do
      add(:id, :binary_id, primary_key: true)
      add(:discord_id, :integer, null: false)
      add(:title, :string, null: false)
      add(:when, :utc_datetime, null: false)
      add(:participants, :integer, default: 0)
      add(:size, :integer, default: 50)
      add(:type, :raidtype, null: false)
      add(:style, :raidstyle)
      add(:side, :side, null: false)
      add(:region, :region, null: false)
      add(:max, :jsonb)
      add(:requirements, :jsonb)

      timestamps()
    end
  end

  def down do
    drop(table(:seedraids))
    RaidTypeEnum.drop_type()
    RaidStyleEnum.drop_type()
    SideEnum.drop_type()
    RegionEnum.drop_type()
  end
end
