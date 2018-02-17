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
      when: raid.when |> Timex.format!("{ISO:Extended:Z}"),
      channel_slug: raid.channel_slug,
      type: raid.type |> Atom.to_string() |> String.replace("_", "-"),
      seeds: raid.seeds,
      content: raid.content
    }
  end
end
