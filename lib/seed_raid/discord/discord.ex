defmodule SeedRaid.Discord do
  import Ecto.Query, warn: false
  alias SeedRaid.Repo
  require Logger

  alias SeedRaid.Discord.Member

  def create_or_update_member(attrs \\ %{}) do
    %Member{}
    |> Member.changeset(attrs)
    |> Repo.insert(
      on_conflict: [
        set: [
          avatar: attrs.avatar,
          discriminator: attrs.discriminator,
          nick: attrs.nick,
          username: attrs.username
        ]
      ],
      conflict_target: :discord_id
    )
  end

  def add_members(members) do
    Member
    |> Repo.insert_all(
      members,
      on_conflict: :replace_all,
      conflict_target: :discord_id
    )
  end
end
