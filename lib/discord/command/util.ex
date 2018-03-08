defmodule Discord.Command.Util do
  require Logger

  alias Nostrum.Api

  def ping(msg) do
    Api.create_message(msg.channel_id, "Pong!")
  end

  def blacklist(id, msg) do
    if msg.author.id == 236_544_307_203_538_946 do
      SeedRaid.Pin.add_to_blacklist(id)
    end
  end
end
