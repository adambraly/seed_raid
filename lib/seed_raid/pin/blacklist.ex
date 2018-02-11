defmodule SeedRaid.Pin.Blacklist do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:discord_id, :integer, autogenerate: false}
  schema "blacklisted_pins" do
  end

  @doc false
  def changeset(blacklist, attrs) do
    blacklist
    |> cast(attrs, [:discord_id])
    |> unique_constraint(:discord_id, name: :blacklisted_pins_discord_id_index)
    |> validate_required([:discord_id])
  end
end
