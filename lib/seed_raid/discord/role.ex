defmodule SeedRaid.Discord.Role do
  use Ecto.Schema
  import Ecto.Changeset


  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "roles" do
    field :discord_id, :integer
    field :hoist, :boolean, default: false
    field :name, :string
    field :position, :integer

    timestamps()
  end

  @doc false
  def changeset(role, attrs) do
    role
    |> cast(attrs, [:discord_id, :name, :hoist, :position])
    |> validate_required([:discord_id, :name, :hoist, :position])
  end
end
