defmodule SeedRaidWeb.RaidView do
  use SeedRaidWeb, :view
  alias SeedRaidWeb.RaidView

  def render("index.json", %{raids: raids}) do
    %{data: render_many(raids, RaidView, "raid.json")}
  end

  def render("show.json", %{raid: raid}) do
    %{data: render_one(raid, RaidView, "raid.json")}
  end

  def render("raid.json", %{raid: raid}) do
    %{
      id: raid.id,
      date: raid.date,
      time: raid.time,
      region: raid.region,
      side: raid.side,
      type: raid.type |> Atom.to_string() |> String.replace("_", "-"),
      seeds: raid.seeds,
      content: raid.content
    }
  end
end
