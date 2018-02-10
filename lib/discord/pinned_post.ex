defmodule SeedRaid.Discord.PinnedPost do
  @moduledoc false

  alias Nostrum.Api
  alias SeedParser.Decoder
  alias SeedRaid.Calendar
  require Logger

  def analyze(message) do
    case message |> parse do
      {:ok, raid} ->
        Calendar.create_or_update_raid(raid)

      _ ->
        :noop
    end
  end

  def all(channel_id) do
    pinned = Api.get_pinned_messages!(channel_id)

    pinned
    |> Enum.each(&analyze/1)
  end

  defp channels do
    Application.fetch_env!(:seed_raid, :channels)
  end

  defp parse(message) do
    case message.content |> Decoder.decode() do
      {:ok, metadata} ->
        channel = channels() |> Map.fetch!(message.channel_id)
        datetime = Timex.to_datetime({Date.to_erl(metadata.date), Time.to_erl(metadata.time)})

        seedraid = %{
          discord_id: message.id,
          author_id: message.author.id,
          side: channel.side,
          region: channel.region,
          content: message.content,
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
