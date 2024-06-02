defmodule GenEditor.MixProject do
  use Mix.Project

  def project do
    [
      app: :gen_editor,
      description: "Kino smart cells for Phoenix's phx.gen commands",
      version: "0.2.8",
      elixir: "~> 1.15",
      start_permanent: Mix.env() == :prod,
      deps: deps(),
      source_url: "https://github.com/beltranaceves/gen_editor",
      homepage_url: "HEX_URL",
      package: [
        maintainers: ["Beltrán Aceves Gil"],
        licenses: ["MIT"],
        links: %{
          "GitHub" => "https://github.com/beltranaceves/gen_editor"
        }
      ]
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger],
      mod: {GenEditor.Application, []}
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      # {:dep_from_hexpm, "~> 0.3.0"},
      # {:dep_from_git, git: "https://github.com/elixir-lang/my_dep.git", tag: "0.1.0"}
      {:ex_doc, "~> 0.27", only: :dev, runtime: false},
      {:kino, "~> 0.12.3"},
      {:uuid, "~> 1.1.8"},
      # {:gen_cli, path: "../gen_cli", only: :dev},
      # {:gen_dsl, path: "../gen_dsl", only: :dev}
      {:gen_dsl, "~> 0.3.6"},
      {:gen_cli, "~> 0.2.2"}
    ]
  end
end
