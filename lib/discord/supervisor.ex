defmodule SeedRaid.Discord.Supervisor do
  @moduledoc false
  use Supervisor

  alias SeedRaid.Discord.Consumer

  def start_link() do
    Supervisor.start_link(__MODULE__, [], name: __MODULE__)
  end

  def init(_arg) do
    # List comprehension creates a consumer per cpu core
    children = [
      {Consumer, []},
      {Task.Supervisor, [name: SeedRaid.Discord.TaskSupervisor]}
    ]

    Supervisor.init(children, strategy: :one_for_one)
  end
end
