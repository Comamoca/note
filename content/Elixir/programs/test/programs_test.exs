defmodule ProgramsTest do
  use ExUnit.Case
  doctest Programs

  test "greets the world" do
    assert Programs.hello() == :world
  end
end
