defmodule HexTemplateTest do
  use ExUnit.Case
  doctest HexTemplate

  test "greets the world" do
    assert HexTemplate.hello() == :world
  end
end
