defmodule SeedRaid.Calendar.Raid do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "seedraids" do
    field(:discord_id, :integer)
    field(:author_id, :integer)

    field(:channel_slug, :string)

    field(:content, :string)

    field(:when, Timex.Ecto.DateTime)

    field(:seeds, :integer)
    field(:type, RaidTypeEnum)

    field(:pinned, :boolean)
    field(:participants, :integer)

    has_one(:author, SeedRaid.Discord.Member, foreign_key: :discord_id, references: :author_id)

    has_many(
      :registrations,
      SeedRaid.Calendar.Registration,
      foreign_key: :raid_id,
      references: :discord_id
    )

    many_to_many(
      :members,
      SeedRaid.Discord.Member,
      join_through: SeedRaid.Calendar.Registration,
      join_keys: [raid_id: :discord_id, member_id: :discord_id]
    )

    timestamps()
  end

  def postprocess_content(%__MODULE__{members: members} = raid) when is_list(members) do
    content = do_postprocess_content(raid.content, members)
    %{raid | content: content}
  end

  def postprocess_content(raid), do: raid

  defp do_postprocess_content(content, [member | rest]) do
    username_reference = "<@#{member.discord_id}>"
    nick_reference = "<@!#{member.discord_id}>"

    member_name =
      case member.nick do
        nil ->
          member.username

        nick ->
          nick
      end

    content =
      content
      |> String.replace(username_reference, member_name)
      |> String.replace(nick_reference, member_name)

    do_postprocess_content(content, rest)
  end

  defp do_postprocess_content(content, []), do: content

  @doc false
  def changeset(raid, attrs) do
    raid
    |> cast(attrs, [
      :author_id,
      :discord_id,
      :channel_slug,
      :content,
      :when,
      :seeds,
      :type,
      :pinned,
      :participants
    ])
    |> validate_required([:discord_id, :author_id, :channel_slug, :content, :when])
  end
end
