defmodule SeedRaid.Discord.Member do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:discord_id, :id, autogenerate: false}
  @foreign_key_type :binary_id
  schema "members" do
    field(:avatar, :string)
    field(:bot, :boolean, default: false)
    field(:discriminator, :integer)
    field(:nick, :string)
    field(:username, :string)
  end

  @doc false
  def changeset(member, attrs) do
    member
    |> cast(attrs, [:discord_id, :bot, :nick, :username, :discriminator, :avatar])
    |> validate_required([:discord_id, :bot, :nick, :username, :discriminator, :avatar])
  end
end
