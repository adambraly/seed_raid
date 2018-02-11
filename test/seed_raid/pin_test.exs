defmodule SeedRaid.PinTest do
  use SeedRaid.DataCase

  alias SeedRaid.Pin.Blacklist
  alias SeedRaid.Pin

  test "add_to_blacklist/1 with valid data" do
    assert {:ok, %Blacklist{} = pin} = Pin.add_to_blacklist(123)
    assert pin.discord_id == 123
  end

  test "reject_blacklisted" do
    assert {:ok, %Blacklist{}} = Pin.add_to_blacklist(123)
    assert {:ok, %Blacklist{}} = Pin.add_to_blacklist(124)

    result =
      [%{id: 123}, %{id: 234}, %{id: 124}, %{id: 127}]
      |> Pin.reject_blacklisted()

    assert result == [%{id: 234}, %{id: 127}]
  end

  test "is_blacklisted?" do
    assert {:ok, %Blacklist{}} = Pin.add_to_blacklist(123)
    assert Pin.is_blacklisted?(%{id: 123}) == true
    assert Pin.is_blacklisted?(%{id: 125}) == false
  end
end
