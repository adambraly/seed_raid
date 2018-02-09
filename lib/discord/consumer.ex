defmodule SeedRaid.Discord.Consumer do
  @moduledoc false

  use Nostrum.Consumer
  alias SeedRaid.Discord.PinnedPost
  # alias Nostrum.Api
  require Logger

  def child_spec(args) do
    %{
      id: __MODULE__,
      start: {__MODULE__, :start_link, [args]},
      type: :worker
    }
  end

  def start_link(_) do
    Consumer.start_link(__MODULE__, :state)
  end

  defp channels do
    Application.fetch_env!(:seed_raid, :channels)
  end

  defp parse_message(message) do
    Task.Supervisor.start_child(SeedRaid.Discord.TaskSupervisor, PinnedPost, :analyze, [
      message
    ])
  end

  def handle_event({:CHANNEL_PINS_UPDATE, {_map}, _ws_state}, state) do
    {:ok, state}
  end

  def handle_event(
        {:MESSAGE_UPDATE, {msg = %{pinned: true, channel_id: channel_id}}, _ws_state},
        state
      ) do
    Logger.info("message update")

    case channels() |> Map.fetch(channel_id) do
      {:ok, _channel} ->
        Logger.info("watched channel")
        parse_message(msg)

      :error ->
        :noop
    end

    {:ok, state}
  end

  def handle_event(
        {:MESSAGE_UPDATE, {msg}, _ws_state},
        state
      ) do
    Logger.info(inspect(msg))

    {:ok, state}
  end

  def handle_event(_, state) do
    {:ok, state}
  end
end
