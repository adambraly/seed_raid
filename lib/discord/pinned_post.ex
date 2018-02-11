defmodule SeedRaid.Discord.PinnedPost do
  @moduledoc false

  alias Nostrum.Api
  alias SeedParser.Decoder
  alias SeedRaid.Calendar
  require Logger

  def analyze(message) do
    case message |> SeedRaid.Pin.is_blacklisted?() do
      true ->
        :noop

      false ->
        do_analyze(message)
    end
  end

  defp do_analyze(message) do
    case message |> parse() do
      {:ok, raid} ->
        Calendar.create_or_update_raid(raid)

      {:error, error} ->
        Logger.warn(
          "error: '#{error}' parsing message (#{message.id}) #{short_message(message.content)}"
        )
    end
  end

  defp short_message(message) do
    starting =
      message
      |> String.slice(0..180)
      |> String.trim()

    ~r/\n/
    |> Regex.replace(starting, " ")
  end

  def all(channel_id) do
    case Api.get_pinned_messages(channel_id) do
      {:ok, messages} ->
        messages
        |> Enum.each(&analyze/1)

      error ->
        Logger.warn("error fetching pined messages #{inspect(error)}")
    end
  end

  defp channels do
    Application.fetch_env!(:seed_raid, :channels)
  end

  defp parse(message) do
    channel_id =
      case message.channel_id do
        id when is_binary(id) ->
          id |> String.to_integer()

        id ->
          id
      end

    channel = channels() |> Map.fetch!(channel_id)
    options = [date: channel.region]

    case message.content |> Decoder.decode(options) do
      {:ok, metadata} ->
        datetime = Timex.to_datetime({Date.to_erl(metadata.date), Time.to_erl(metadata.time)})

        seedraid = %{
          discord_id: message.id,
          author_id: message.author["id"],
          side: channel.side,
          region: channel.region,
          content: Decoder.format(message.content),
          seeds: metadata.seeds,
          type: metadata.type,
          when: datetime
        }

        {:ok, seedraid}

      {:error, error} ->
        {:error, error}
    end
  end
end
