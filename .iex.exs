defmodule Testing do

  def walking() do
    IO.puts("Walking")
  end

  def test_macro() do
    fields = ~w|module function args|
    _field_map = %{
      "module" => "Testing",
      "function" => "",
      "args" => []
    }
    quote do
      %{
      unquote(
        Enum.map(fields, fn field ->
          {String.to_atom(field), Map.get(_field_map, field)}
        end)
      )
      }
    end
    |> Macro.to_string()
  end

  def test_map() do
    test_map = %{
      "module" => "Testing",
      "function" => "",
      "args" => []
    }
    quote do
      unquote(test_map)
    end
  end
end
