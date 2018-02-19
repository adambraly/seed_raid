defmodule Mix.Tasks.Pins.ParseChannel do
  @moduledoc false

  require Logger
  use Mix.Task
  alias Discord.PinnedPost

  def run([channel_id]) do
    Mix.Task.run("app.start")
    PinnedPost.all(channel_id)
  end
end
