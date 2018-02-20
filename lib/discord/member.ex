defmodule Discord.Member do
  use GenServer

  alias Nostrum.Api
  require Logger

  def start_link(default) do
    GenServer.start_link(__MODULE__, default, name: __MODULE__)
  end

  def init(_args) do
    state = %{}
    {:ok, state}
  end

  def all() do
    GenServer.call(__MODULE__, :all, 30000)
  end

  def delete(member) do
    GenServer.call(__MODULE__, {:remove, member})
  end

  def add(member) do
    GenServer.call(__MODULE__, {:add, member})
  end

  def update(member) do
    GenServer.call(__MODULE__, {:add, member})
  end

  def handle_call(:all, _from, state) do
    do_all(0)

    {:reply, :ok, state}
  end

  def handle_call({:remove, member}, _from, state) do
    member.user.id
    |> SeedRaid.Discord.get_member()
    |> SeedRaid.Discord.delete_member()

    {:reply, :ok, state}
  end

  def handle_call({:add, member}, _from, state) do
    member
    |> parse
    |> SeedRaid.Discord.create_or_update_member()

    {:reply, :ok, state}
  end

  defp do_all(after_member) do
    Logger.info("parsing members after: #{after_member}")
    {:ok, members} = Api.get_guild_members(guild_id(), %{after: after_member, limit: 1000})

    members
    |> Enum.map(&parse/1)
    |> SeedRaid.Discord.add_members()

    case members |> Enum.count() do
      1000 ->
        last_member = members |> List.last()
        do_all(last_member.user.id)

      _ ->
        :noop
    end
  end

  defp to_integer(term) when is_number(term), do: term

  defp to_integer(term) when is_binary(term) do
    term |> String.to_integer()
  end

  defp parse(member) do
    %{
      avatar: member.user.avatar,
      discriminator: to_integer(member.user.discriminator),
      nick: member.nick,
      username: member.user.username,
      discord_id: to_integer(member.user.id)
    }
  end

  defp guild_id do
    Application.fetch_env!(:seed_raid, :guild)
  end
end
