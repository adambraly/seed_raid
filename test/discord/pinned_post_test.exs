defmodule Discord.PinnedTest do
  use ExUnit.Case, async: true

  test "replace_roles " do
    content = "role: <@&277668776382693376> "
    content = Discord.PinnedPost.replace_roles(content)

    assert content == "role: @na-horde "

    content = "role: <@&277668856741494785> "
    content = Discord.PinnedPost.replace_roles(content)

    assert content == "role: @na-alliance "
  end
end
