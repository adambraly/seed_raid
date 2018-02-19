defmodule Discord.Supervisor do
  @moduledoc false
  use Supervisor

  alias Discord.{Consumer, PinnedPost, Member}

  def start_link() do
    Supervisor.start_link(__MODULE__, [], name: __MODULE__)
  end

  def init(_arg) do
    # List comprehension creates a consumer per cpu core
    children = [
      {Consumer, []},
      {PinnedPost, []},
      {Member, []},
      {Task.Supervisor, [name: Discord.TaskSupervisor]}
    ]

    Supervisor.init(children, strategy: :one_for_one)
  end
end
