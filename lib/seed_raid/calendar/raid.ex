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

    has_one(:author, SeedRaid.Discord.Member, foreign_key: :discord_id, references: :author_id)

    timestamps()
  end

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
      :pinned
    ])
    |> validate_required([:discord_id, :author_id, :channel_slug, :content, :when])
  end
end
