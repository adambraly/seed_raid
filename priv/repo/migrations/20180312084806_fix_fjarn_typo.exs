defmodule SeedRaid.Repo.Migrations.FixFjarnTypo do
  use Ecto.Migration
  @disable_ddl_transaction true

  def up do
    Ecto.Migration.execute("ALTER TYPE raidtype ADD VALUE IF NOT EXISTS 'fjarnskaggl'")
  end
end
