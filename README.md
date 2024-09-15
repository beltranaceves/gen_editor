# GenEditor
[![Docs](https://img.shields.io/badge/hex.pm-docs-8e7ce6.svg)](https://hexdocs.pm/gen_editor)

[gen_dsl](https://github.com/beltranaceves/gen_dsl) integration with [Kino](https://github.com/livebook-dev/kino) for [Livebook](https://livebook.dev/). It contains a collection of Smart Cells for configuring [Phoenix](https://www.phoenixframework.org/) project templates in terms of code generation [Mix Tasks](https://hexdocs.pm/phoenix/Mix.Tasks.Phx.Gen.html) and generating projects given one of these templates.

![app](https://github.com/user-attachments/assets/eeb0aa63-ab85-4b6c-9c8e-ec771f13fd5c)

Phoenix `mix phx.gen` commands are powerful but uncomfortable. They are repetitive, error-prone, lack good in-terminal documentation and don't lend themselves to an iterative design process. With GenEditor you can bring them into Livebook and enjoy ease of documentation, a suitable format for version control, a collaborative editor, persistent artifacts after project generation.

You can have a look at the `examples` folder or jump straight in:

[![d](https://livebook.dev/badge/v1/blue.svg)](https://livebook.dev/run?url=https%3A%2F%2Fgithub.com%2Fbeltranaceves%2Fgen_editor%2Fblob%2Fmain%2Fexamples%2Fauth_users_comments_admin.livemd)

A temporary Livebook [hosted instance](https://huggingface.co/spaces/beltranaceves/livebook) (password: `livebook_playground`)has been set up for users to try out the examples. Just click open and import from one of the repo's urls.

## Installation

To bring GenEditor to Livebook all you need to do is `Mix.install/2`:

```elixir
Mix.install([
  {:gen_editor, "~> 0.3.2"}
])
```

## Use and examples
GenEditor is an alternative way to define and execute Phoenix Mix commands for code generation. It allows you to use Smart Cells to configure a template file containing all the desired Mix commands, and execute it within Livebook.

Each cell configures a `mix phx.gen` task, or a shared resource like `Context` or `Schema`.

At the moment you can only configure a single template file and application per Livebook notebook. Each notebook must contains at least a cell of type App and cell of type Blueprint to generate a template file.

# License
Copyright (c) 2024 Beltrán Aceves and others, MIT License. See [LICENSE](https://github.com/beltranaceves/gen_editor/blob/main/LICENSE) for further details.