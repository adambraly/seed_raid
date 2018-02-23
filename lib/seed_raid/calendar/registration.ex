defmodule SeedRaid.Calendar.Registration do
  use Ecto.Schema

  import Ecto.Changeset

  @primary_key false
  schema "registrations" do
    belongs_to(
      :raid,
      SeedRaid.Calendar.Raid,
      foreign_key: :raid_id,
      references: :discord_id
    )

    belongs_to(
      :member,
      SeedRaid.Discord.Member,
      foreign_key: :member_id,
      references: :discord_id
    )

    field(:type, :string)
  end

  def changeset(registration, attrs \\ %{}) do
    registration
    |> cast(attrs, [
      :raid_id,
      :member_id,
      :type
    ])
    |> validate_required([:raid_id, :member_id, :type])
    |> foreign_key_constraint(:raid_id)
    |> foreign_key_constraint(:member_id)
    |> unique_constraint(:member_id, name: :registrations_pkey)
  end
end
