defmodule Discord.Logger do
  alias SeedRaid.Pin
  alias Nostrum.Api

  defp error_channel do
    Application.fetch_env!(:seed_raid, :logger_channel)
  end

  defp channels do
    Application.fetch_env!(:seed_raid, :channels)
  end

  defp channel_slug(id) do
    id = id |> String.to_integer()
    channel = channels() |> Map.fetch!(id)
    channel[:slug]
  end

  defp do_warn(msg, missing) do
    missing_informations =
      missing
      |> Enum.map(fn key -> key |> Atom.to_string() end)
      |> Enum.join(" :arrow_backward:\n:arrow_forward: ")

    message =
      "<@!#{msg.author.id}> have published have published a new raid in #{
        channel_slug(msg.channel_id)
      }:\n" <>
        "\n#{short_message(msg)}\n(...)\n" <>
        ":exclamation: the parser can't compute the following informations:\n" <>
        ":arrow_forward: #{missing_informations} :arrow_backward:"

    Api.create_message(error_channel(), message)
  end

  defp short_message(message) do
    minimal =
      message.content
      |> String.slice(0..80)
      |> String.trim()

    formatOcc = length(String.split(minimal, "```")) - 1

    case rem(formatOcc, 2) do
      0 ->
        minimal

      1 ->
        minimal <> "```"
    end
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
