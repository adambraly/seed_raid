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

    many_to_many(
      :raids,
      SeedRaid.Calendar.Raid,
      join_through: SeedRaid.Calendar.Registration,
      join_keys: [member_id: :discord_id, raid_id: :discord_id]
    )
  end

  @doc false
  def changeset(member, attrs) do
    member
    |> cast(attrs, [:discord_id, :bot, :nick, :username, :discriminator, :avatar])
    |> validate_required([:discord_id, :bot, :username, :discriminator, :avatar])
  end
end
