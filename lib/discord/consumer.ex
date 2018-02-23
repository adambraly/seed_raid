defmodule Discord.Consumer do
  @moduledoc false

  use Nostrum.Consumer
  alias Discord.PinnedPost
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
    PinnedPost.analyze(message)
  end

  defp all_pins(channel_id) do
    PinnedPost.all(channel_id)
  end

  def handle_event({:GUILD_MEMBER_ADD, {_guild_id, nil}, _ws_state}, state) do
    {:ok, state}
  end

  def handle_event({:GUILD_MEMBER_ADD, {_guild_id, newmember}, _ws_state}, state) do
    Logger.info("new guild member: #{newmember.user.id}")
    Logger.info(inspect(newmember))
    Discord.Member.add(newmember)
    {:ok, state}
  end

  def handle_event({:GUILD_MEMBER_REMOVE, {_guild_id, nil}, _ws_state}, state) do
    {:ok, state}
  end

  def handle_event({:GUILD_MEMBER_REMOVE, {_guild_id, oldmember}, _ws_state}, state) do
    Logger.info("guild member removed: #{oldmember.user.id}")
    Discord.Member.delete(oldmember)
    {:ok, state}
  end

  def handle_event({:GUILD_MEMBER_UPDATE, {_guild_id, _oldmember, newmember}, _ws_state}, state) do
    Logger.info("guild member updated: #{newmember.user.id}")
    Logger.info(inspect(newmember))
    Discord.Member.update(newmember)
    {:ok, state}
  end

  def handle_event({:CHANNEL_PINS_UPDATE, {%{channel_id: channel_id}}, _ws_state}, state) do
    case channels() |> Map.fetch(channel_id) do
      {:ok, _channel} ->
        all_pins(channel_id)

      :error ->
        :noop
    end

    {:ok, state}
  end

  def handle_event(
        {:MESSAGE_UPDATE, {msg = %{pinned: true, channel_id: channel_id}}, _ws_state},
        state
      ) do
    case channels() |> Map.fetch(channel_id) do
      {:ok, _channel} ->
        parse_message(msg)

      :error ->
        :noop
    end

    {:ok, state}
  end

  def handle_event(_, state) do
    {:ok, state}
  end
end
