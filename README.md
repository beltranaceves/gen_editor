# GenEditor
[![Docs](https://img.shields.io/badge/hex.pm-docs-8e7ce6.svg)](https://hexdocs.pm/gen_editor)

[gen_dsl](https://github.com/beltranaceves/gen_dsl) integration with [Kino](https://github.com/livebook-dev/kino) for [Livebook](https://livebook.dev/). It contains a collection of Smart Cells for configuring and executing [Phoenix](https://www.phoenixframework.org/) project templates in terms of code generation [Mix Tasks](https://hexdocs.pm/phoenix/Mix.Tasks.Phx.Gen.html).

![app](https://github.com/user-attachments/assets/eeb0aa63-ab85-4b6c-9c8e-ec771f13fd5c)

Phoenix `mix phx.gen` commands are powerful but uncomfortable. They are repetitive, error-prone, lack good in-terminal documentation and don't lend themselves to an iterative design process. With GenEditor you can bring them into Livebook and enjoy its benefits (ease of documentation, suitable for version control, collaborative editor, persist artifacts).

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
MIT License

Copyright (c) 2024 Beltrán Aceves and others

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.