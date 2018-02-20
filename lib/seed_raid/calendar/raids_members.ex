defmodule SeedRaid.Calendar.RaidsMembers do
  use Ecto.Schema

  @primary_key false
  schema "seedraids_members" do
    belongs_to(
      :seedraid,
      SeedRaid.Calendar.Raid,
      foreign_key: :seedraid_id,
      references: :discord_id
    )

    belongs_to(
      :member,
      SeedRaid.Discord.Member,
      foreign_key: :member_id,
      references: :discord_id
    )
  end
end
