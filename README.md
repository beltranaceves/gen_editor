# GenEditor
[gen_dsl](https://github.com/beltranaceves/gen_dsl) integration with [Kino](https://github.com/livebook-dev/kino) for [Livebook](https://livebook.dev/). It contains a collection of Smart Cells for configuring and executing [Phoenix](https://www.phoenixframework.org/) project templates in terms of code generation [Mix Tasks](https://hexdocs.pm/phoenix/Mix.Tasks.Phx.Gen.html).

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

### App
![app](https://github.com/user-attachments/assets/eeb0aa63-ab85-4b6c-9c8e-ec771f13fd5c)
### Blueprint
![image (1)](https://github.com/user-attachments/assets/cb1661b6-8701-4a8f-a11a-00e10c8e4101)

