defmodule SeedRaid.Calendar.Raid do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "seedraids" do
    field(:participants, :integer)
    field(:discord_id, :integer)
    field(:size, :integer)
    field(:title, :string)
    field(:when, :utc_datetime)
    field(:style, RaidStyleEnum)
    field(:type, RaidTypeEnum)
    field(:side, SideEnum)
    field(:region, RegionEnum)

    timestamps()
  end

  @doc false
  def changeset(raid, attrs) do
    raid
    |> cast(attrs, [
      :title,
      :participants,
      :size,
      :when,
      :style,
      :type,
      :side,
      :region,
      :discord_id
    ])
    |> validate_required([:title, :size, :when, :side, :region, :discord_id])
  end
end
