defmodule SeedRaid.Calendar.Registration do
  use Ecto.Schema

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
end
