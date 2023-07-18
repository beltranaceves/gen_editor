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
end


results = [Postgrex.Result, MyXQL.Result, Exqlite.Result, ReqBigQuery.Result, ReqAthena.Result]

for mod <- results do
  defimpl Kino.Render, for: mod do
    def to_livebook(result) do
      result
      |> Kino.DataTable.new(name: "Results")
      |> Kino.Render.to_livebook()
    end
  end
end
