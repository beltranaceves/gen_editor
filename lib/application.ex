defmodule GenEditor.Application do
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    Kino.SmartCell.register(GenEditor.ElementEditor)
    # TODO: rename the project to be in line with Kino widelines. Ex: kino_gen, kino_gen_editor
    # TODO: register the global generable element Store here. Use a GenServer
    children = []
    opts = [strategy: :one_for_one, name: KinoDB.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
