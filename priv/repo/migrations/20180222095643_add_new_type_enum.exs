defmodule SeedRaid.Repo.Migrations.AddNewTypeEnum do
  use Ecto.Migration
  @disable_ddl_transaction true

  def up do
    Ecto.Migration.execute("ALTER TYPE RaidType ADD VALUE 'fjarnskaggl'")
    Ecto.Migration.execute("ALTER TYPE RaidType ADD VALUE 'dreamleaf'")
  end

  def down do
  end
end
