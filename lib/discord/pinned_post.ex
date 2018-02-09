defmodule SeedRaid.Discord.PinnedPost do
  @moduledoc false

  alias Nostrum.Api
  alias SeedParser.Decoder
  alias SeedRaid.Calendar
  require Logger
  @required_keys [:title, :date, :time]

  def valid_seedraid?(seedraid) do
    @required_keys
    |> Enum.all?(fn key -> seedraid |> Map.has_key?(key) end)
  end

  defp channels do
    Application.fetch_env!(:seed_raid, :channels)
  end

  def analyze(message) do
    case message |> parse do
      {ok, raid} ->
        Calendar.create_or_update(raid)
    end
  end

  def parse(message) do
    case message.content |> Decoder.decode() do
      {:ok, metadata} ->
        channel = channels() |> Map.fetch!(message.channel_id)
        datetime = Timex.to_datetime({Date.to_erl(metadata.date), Time.to_erl(metadata.time)})

        seedraid = %{
          discord_id: message.id,
          author_id: message.author.id,
          side: channel.side,
          faction: channel.faction,
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

  defp ok({:ok, _}), do: true
  defp ok(_), do: false

  def get(channel_id) do
    pinned = Api.get_pinned_messages!(channel_id)

    pinned
    |> Enum.each(&analyze/1)
  end
end
