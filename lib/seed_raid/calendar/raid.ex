defmodule SeedRaid.Calendar.Raid do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "seedraids" do
    field(:discord_id, :integer)
    field(:author_id, :integer)

    field(:side, SideEnum)
    field(:region, RegionEnum)

    field(:content, :string)

    field(:when, Timex.Ecto.DateTime)

    field(:seeds, :integer)
    field(:type, RaidTypeEnum)

    timestamps()
  end

  @doc false
  def changeset(raid, attrs) do
    raid
    |> cast(attrs, [
      :author_id,
      :discord_id,
      :side,
      :region,
      :content,
      :when,
      :seeds,
      :type
    ])
    |> validate_required([:discord_id, :author_id, :side, :region, :content, :when])
  end
end
