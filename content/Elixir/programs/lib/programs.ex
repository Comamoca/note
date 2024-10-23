defmodule Programs do
  @moduledoc """
  Documentation for `Programs`.
  """

  @doc """
  Hello world.

  ## Examples

      iex> Programs.hello()
      :world

  """
  def hello do
    :world
  end
end

defmodule Programs.Exsample do


  @spec something(String.t()) :: atom
  def something(name) do
    "Hello #{name}!"
    # retunr :ok
    |> IO.puts()
  end
end
