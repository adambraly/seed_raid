defmodule Mix.Tasks.Discord.AllMembers do
  @moduledoc false

  require Logger
  use Mix.Task
  alias Discord.Member

  def run(_) do
    Mix.Task.run("app.start")
    Member.all()
    :timer.sleep(5000)
  end
end
