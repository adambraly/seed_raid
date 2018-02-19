defmodule Mix.Tasks.Pins.ParseAll do
  @moduledoc false

  require Logger
  use Mix.Task
  alias Discord.PinnedPost

  def run(_) do
    Mix.Task.run("app.start")

    :seed_raid
    |> Application.get_env(:channels)
    |> Enum.each(fn {channel_id, _} ->
      PinnedPost.all(channel_id)
      :timer.sleep(5000)
    end)
  end
end
