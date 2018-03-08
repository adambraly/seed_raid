defmodule Discord.Command do
  @moduledoc false
  @prefix "!sr"

  alias Discord.Command.Util

  defp actionable_command?(msg) do
    self_id = Nostrum.Cache.Me.get().id
    String.starts_with?(msg.content, @prefix) and msg.author.id != self_id
  end

  def handle(msg) do
    if actionable_command?(msg) do
      msg.content
      |> String.trim()
      |> String.split(" ")
      |> tl
      |> execute(msg)
    end
  end

  def execute(["ping"], msg) do
    Util.ping(msg)
  end

  def execute(["bl", id], msg) do
    Util.blacklist(id, msg)
  end
end
