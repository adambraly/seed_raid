defmodule Discord.Logger do
  alias SeedRaid.Pin
  alias Nostrum.Api

  defp channel do
    Application.fetch_env!(:seed_raid, :logger_channel)
  end

  defp do_warn(msg, missing) do
    missing_informations =
      missing
      |> Enum.map(fn key -> key |> Atom.to_string() end)
      |> Enum.join(", ")

    message =
      "<@!#{msg.author.id}> have published have published a new raid:\n#{short_message(msg)}\n(...)\n" <>
        "the parser can't compute the following informations: *#{missing_informations}*\n" <>
        "more help can be found here: http://bit.ly/2Fpa2Ep"

    Api.create_message(channel(), message)
  end

  defp short_message(message) do
    message.content
    |> String.slice(0..150)
    |> String.trim()
  end

  def warn(msg, missing) do
    case(Pin.error_already_logged?(msg.id)) do
      true ->
        :noop

      false ->
        Pin.insert_error(msg.id, missing)
        do_warn(msg, missing)
    end
  end
end
