defmodule SeedRaid.Pin.Error do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "pins_errors" do
    field(:discord_id, :integer)
    field(:date, :boolean, default: false)
    field(:format, :boolean, default: false)
    field(:time, :boolean, default: false)

    timestamps()
  end

  @doc false
  def changeset(error, attrs) do
    error
    |> cast(attrs, [:discord_id, :date, :time, :format])
    |> validate_required([:discord_id])
  end
end
