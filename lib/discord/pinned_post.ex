defmodule SeedRaid.Discord.PinnedPost do
  @moduledoc false

  alias Nostrum.Api
  alias SeedParser.Decoder
  require Logger
  @required_keys [:title, :date, :time]

  def valid_seedraid?(seedraid) do
    @required_keys
    |> Enum.all?(fn key -> seedraid |> Map.has_key?(key) end)
  end

  def parse_message(message) do
    case message.content |> Decoder.decode() do
      {:ok, seedraid} ->
        Logger.info(inspect(seedraid))
        {:ok, seedraid}

      {:error, error} ->
        Logger.info("error parsing: #{error}")
        {:error, error}
    end
  end

  defp ok({:ok, _}), do: true
  defp ok(_), do: false

  def get(channel_id) do
    pinned = Api.get_pinned_messages!(channel_id)

    pinned
    |> Enum.each(&parse_message/1)
    |> Enum.filter(&ok/1)
    |> Enum.map(fn {:ok, message} -> message end)
  end
end
