# HexTemplate

Starter project for HEX packages. Includes a GH action to publish to hex.pm on push.

1. First, create a key on your [Hex.pm dashboard](https://hex.pm/dashboard/keys).

2. Next, add the key from step 1 to your GitHub repository’s secrets. Call it HEX_API_KEY.

## Installation

If [available in Hex](https://hex.pm/docs/publish), the package can be installed
by adding `hex_template` to your list of dependencies in `mix.exs`:

```elixir
def deps do
  [
    {:hex_template, "~> 0.1.0"}
  ]
end
```

Documentation can be generated with [ExDoc](https://github.com/elixir-lang/ex_doc)
and published on [HexDocs](https://hexdocs.pm). Once published, the docs can
be found at <https://hexdocs.pm/hex_template>.

