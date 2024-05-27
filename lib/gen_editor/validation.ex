defmodule GenEditor.Validation do
  def is_module_valid(name) do
    name |> String.match?(~r/^[A-Z]\w*(\.[A-Z]\w*)*$/)
  end

  def check_app_name!(name) do
    name |> String.match?(~r/^[a-z][\w_]*$/)
  end
end
