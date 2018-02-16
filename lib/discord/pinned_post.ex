defmodule SeedRaid.Discord.PinnedPost do
  @moduledoc false

  use GenServer
  use Timex

  alias Nostrum.Api
  alias SeedParser.Decoder
  alias SeedRaid.Calendar
  require Logger

  @timezone_map %{us: "EST", eu: "CET"}

  def start_link(default) do
    GenServer.start_link(__MODULE__, default, name: __MODULE__)
  end

  def init(_args) do
    state = %{channels: channels()}
    {:ok, state}
  end

  def analyze(message) do
    GenServer.cast(__MODULE__, {:analyze, message})
  end

  def all(channel_id) do
    GenServer.cast(__MODULE__, {:all, channel_id})
  end

  def handle_cast({:all, channel_id}, %{channels: channels} = state) do
    do_all(channel_id, channels)
    {:noreply, state}
  end

  def handle_cast({:analyze, message}, %{channels: channels} = state) do
    case message |> SeedRaid.Pin.is_blacklisted?() do
      true ->
        :noop

      false ->
        channel_id =
          message
          |> message_channel_id()

        case channels |> Map.fetch(channel_id) do
          {:ok, channel} ->
            do_analyze(message, channel)

          _ ->
            Logger.warn("Unkwown channel id: #{channel_id}")
        end
    end

    {:noreply, state}
  end

  def handle_info({:all, channel_id}, %{channels: channels} = state) do
    do_all(channel_id, channels)
    {:noreply, state}
  end

  defp message_channel_id(message) do
    case message.channel_id do
      id when is_binary(id) ->
        id |> String.to_integer()

      id ->
        id
    end
  end

  defp do_analyze(message, channel) do
    case parse(message, channel) do
      {:ok, raid} ->
        time_string = raid.when |> Timex.format!("%d/%m/%y %H:%M", :strftime)

        Logger.info(
          "#{raid.region}-#{raid.side} sucessfully parsed: [#{raid.seeds} #{raid.type}] at #{
            time_string
          }"
        )

        Calendar.create_or_update_raid(raid)

      {:error, :upcoming} ->
        :silence

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

  defp do_all(channel_id, channels) do
    case Api.get_pinned_messages(channel_id) do
      {:ok, messages} ->
        case channels |> Map.fetch(channel_id) do
          {:ok, channel} ->
            Calendar.unpin_all(channel.region, channel.side)

          _ ->
            Logger.warn("Unkwown channel id: #{channel_id}")
        end

        messages
        |> Enum.each(&analyze/1)

      {:error, %{status_code: 429, message: %{"retry_after" => retry_after}}} ->
        channel_name =
          case channels |> Map.fetch(channel_id) do
            {:ok, channel} ->
              "#{channel.region}-#{channel.side}"
              |> String.upcase()

            _ ->
              "#{channel_id}"
          end

        Logger.warn("error 429, will retry to parse channel #{channel_name} after #{retry_after}")

        Process.send_after(self(), {:all, channel_id}, retry_after)

      error ->
        Logger.warn("error fetching pined messages #{inspect(error)}")
    end
  end

  defp channels do
    Application.fetch_env!(:seed_raid, :channels)
  end

  defp parse(message, channel) do
    options = [date: channel.region]

    case message.content |> Decoder.decode(options) do
      {:ok, metadata} ->
        tz =
          @timezone_map
          |> Map.fetch!(channel.region)

        datetime = Timex.to_datetime({Date.to_erl(metadata.date), Time.to_erl(metadata.time)}, tz)

        seedraid = %{
          discord_id: message.id,
          author_id: message.author["id"],
          side: channel.side,
          region: channel.region,
          content: Decoder.format(message.content),
          seeds: metadata.seeds,
          type: metadata.type,
          when: datetime,
          pinned: true
        }

        {:ok, seedraid}

      {:error, error} ->
        {:error, error}
    end
  end
end
