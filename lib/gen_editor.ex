defmodule GenEditor do
  @moduledoc """
  Documentation for `GenEditor`.
  """

  @doc """
  Hello world.

  ## Examples

      iex> GenEditor.hello()
      :world

  """
  def hello do
    :world
  end

  def generate_from_blueprint(blueprint) do
    IO.puts("Generating from blueprint: #{blueprint}")
    GenDSL.generate_from_blueprint(blueprint)
  end
end
