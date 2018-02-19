defmodule Discord.PinnedPost do
  @moduledoc false

  use GenServer
  use Timex

  alias Nostrum.Api
  alias SeedParser.Decoder
  alias SeedRaid.Calendar
  alias SeedRaidWeb.RaidChannel
  require Logger

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
        channel = channels |> Map.fetch!(message.channel_id)

        case do_analyze(message, channel) do
          {:ok, raid = %Calendar.Raid{}} ->
            RaidChannel.update_raid(raid)

          _ ->
            :noop
        end
    end

    {:noreply, state}
  end

  def handle_info({:all, channel_id}, %{channels: channels} = state) do
    do_all(channel_id, channels)
    {:noreply, state}
  end

  defp do_analyze(message, channel) do
    message = message_to_struct(message)

    case message |> SeedRaid.Pin.is_blacklisted?() do
      true ->
        :noop

      false ->
        case parse(message, channel) do
          {:ok, raid} ->
            time_string = raid.when |> Timex.format!("%d/%m/%y %H:%M", :strftime)

            Logger.info(
              "#{raid.channel_slug} sucessfully parsed: [#{raid.seeds} #{raid.type}] at #{
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
  end

  def key_to_atom(map) do
    Enum.reduce(map, %{}, fn
      {key, value}, acc when is_atom(key) -> Map.put(acc, key, value)
      {key, value}, acc when is_binary(key) -> Map.put(acc, String.to_existing_atom(key), value)
    end)
  end

  defp message_to_struct(message = %Nostrum.Struct.Message{}) do
    case message |> Map.fetch!(:author) do
      %Nostrum.Struct.User{} ->
        message

      author ->
        message |> Map.put(:author, author |> key_to_atom |> Nostrum.Struct.User.to_struct())
    end
  end

  defp message_to_struct(message) do
    Nostrum.Struct.Message.to_struct(message)
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
        channel = channels |> Map.fetch!(channel_id)
        Calendar.unpin_all(channel.slug)

        messages
        |> Enum.each(&do_analyze(&1, channel))

        RaidChannel.sync_channel(channel.slug)

      {:error, %{status_code: 429, message: %{"retry_after" => retry_after}}} ->
        channel_name =
          case channels |> Map.fetch(channel_id) do
            {:ok, channel} ->
              "#{channel.slug}"
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
        datetime =
          Timex.to_datetime(
            {Date.to_erl(metadata.date), Time.to_erl(metadata.time)},
            channel.timezone
          )

        seedraid = %{
          discord_id: message.id,
          author_id: message.author |> Map.fetch!(:id),
          channel_slug: channel.slug,
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
