defmodule GenEditor.ElementEditor do
  use Kino.JS, assets_path: "lib/assets/element_editor"
  use Kino.JS.Live
  use Kino.SmartCell, name: "Generable Element"

  @generable_elements ~w|App Html Auth Notifier Cert Channel Presence Secret Schema Context|

  @impl true
  def init(attrs, ctx) do
    type = attrs["type"] || "App"
    # TODO: add method to bring all appropriate attributes from GenServer
    # Append map to attrs, so that access is uniform

    deps = %{
      "context_list" => get_context_list(ctx),
      "schema_list" => attrs["schema_list"] || [],
      "web_list" => attrs["web_list"] || [],
      "context_apps_list" => attrs["context_apps_list"] || [],
      "module_list" => attrs["module_list"] || [],
      "hashing_lib_list" => [
        %{label: "bcrypt", value: "bcrypt"},
        %{label: "argon2", value: "argon2"},
        %{label: "pbkdf2", value: "pbkdf2"}
      ],
      "datatype_list" => [
        %{label: "id", value: "id"},
        %{label: "binary_id", value: "binary_id"},
        %{label: "string", value: "string"},
        %{label: "integer", value: "integer"},
        %{label: "float", value: "float"},
        %{label: "boolean", value: "boolean"},
        %{label: "date", value: "date"},
        %{label: "time", value: "time"},
        %{label: "datetime", value: "datetime"},
        %{label: "map", value: "map"},
        %{label: "array", value: "array"},
        %{label: "binary", value: "binary"},
        %{label: "decimal", value: "decimal"},
        %{label: "time_usec", value: "time_usec"},
        %{label: "naive_datetime", value: "naive_datetime"},
        %{label: "naive_datetime_usec", value: "naive_datetime_usec"},
        %{label: "utc_datetime", value: "utc_datetime"},
        %{label: "utc_datetime_usec", value: "utc_datetime_usec"}
        # TODO: allow for array and map datatypes
        # TODO: turn this into a gen_editor repository issue
      ]
    }

    fields = %{
      "UUID" => UUID.uuid1(),
      "placeholder" => "Enter a value",
      "variable" => Kino.SmartCell.prefixed_var_name("conn", attrs["variable"]),
      "type" => type,
      # Element dependencies
      "deps" => deps,
      # App Element
      "path" => attrs["path"] || "",
      "app" => attrs["app"] || "",
      "module" => attrs["module"] || "",
      "database" => attrs["database"] || "",
      "no_assets" => attrs["no_assets"] || false,
      "no_esbuild" => attrs["no_esbuild"] || false,
      "no_tailwind" => attrs["no_tailwind"] || false,
      "no_ecto" => attrs["no_ecto"] || false,
      "no_gettext" => attrs["no_gettext"] || false,
      "no_html" => attrs["no_html"] || false,
      "no_dashboard" => attrs["no_dashboard"] || false,
      "no_live" => attrs["no_live"] || false,
      "no_mailer" => attrs["no_mailer"] || false,
      "verbose" => attrs["verbose"] || false,
      "version" => attrs["version"] || false,
      "install" => attrs["install"] || true,
      "no_install" => attrs["no_install"] || false,
      "binary_id" => attrs["binary_id"] || false,
      # HTML Element
      "context" => attrs["context"] || "",
      "schema" => attrs["schema"] || "",
      "web" => attrs["web"] || "",
      "context_app" => attrs["context_app"] || "",
      "no_schema" => attrs["no_schema"] || false,
      "no_context" => attrs["no_context"] || false,
      # Notifier Element standalone
      "notifier_name" => attrs["notifier_name"] || "",
      "message_name_list" => attrs["message_name_list"] || [%{"message_name" => "welcome"}],
      # Auth Element
      "context" => attrs["context"] || "",
      "schema" => attrs["schema"] || "",
      "web" => attrs["web"] || "",
      "hashing_lib" => attrs["hashing_lib"] || "",
      "live" => attrs["live"] || true,
      "no_live" => attrs["no_live"] || false,
      # Cert Element
      "app" => attrs["app"] || "",
      "domain" => attrs["domain"] || "",
      "url" => attrs["url"] || "",
      "output_path" => attrs["output_path"] || "",
      "cert_name" => attrs["cert_name"] || "",
      # Channel Element
      "module" => attrs["module"] || "",
      # TODO: rename all properties to match the element names in gen_dsl for easier use
      # Presence Element
      "module" => attrs["module"] || "",
      # Secret Element
      "length" => attrs["length"] || "",
      # Schema Element
      "module" => attrs["module"] || "",
      "name" => attrs["name"] || "",
      "table" => attrs["table"] || "",
      "repo" => attrs["repo"] || "",
      "migration_dir" => attrs["migration_dir"] || "",
      "prefix" => attrs["prefix"] || "",
      "no_migration" => attrs["no_migration"] || true,
      "binary_id" => attrs["binary_id"] || false,
      "context_app" => attrs["context_app"] || "",
      "fields" => attrs["fields"] || [%{"datatype" => "string", "field_name" => "username"}],
      # Context Elements
      "no_merge_with_existing_context" => attrs["no_merge_with_existing_context"] || false,
      "merge_with_existing_context" => attrs["merge_with_existing_context"] || true,
      "no_schema" => attrs["no_schema"] || false,
      "standalone" => case attrs["standalone"] do
        nil -> false
        _ -> attrs["standalone"]
      end
    }

    ctx =
      assign(ctx,
        fields: fields,
        missing_dep: missing_dep(fields),
        help_box: help_box(fields),
        has_aws_credentials: Code.ensure_loaded?(:aws_credentials),
        blueprint: %{}
      )

    {:ok, ctx}
  end

  @impl true
  def handle_connect(ctx) do
    payload = %{
      fields: ctx.assigns.fields,
      missing_dep: ctx.assigns.missing_dep,
      help_box: ctx.assigns.help_box,
      has_aws_credentials: ctx.assigns.has_aws_credentials,
      blueprint: ctx.assigns.blueprint || %{},
      first_render: true
    }

    {:ok, payload, ctx}
  end

  @impl true
  def handle_event("update_field", %{"field" => field, "value" => value}, ctx) do
    # value = case field do
    #   "standalone" ->
    #     case value do
    #       nil -> false
    #       _ -> value
    #     end
    #   _ ->
    #     value
    # end
    updated_fields = to_updates(ctx.assigns.fields, field, value)
    ctx = update(ctx, :fields, &Map.merge(&1, updated_fields))

    updated_deps = %{} |> Map.put("deps",
      (ctx.assigns.fields["deps"]) |> Map.merge(update_deps(ctx)))


    ctx = update(ctx, :fields, &Map.merge(&1, updated_deps))



    {:noreply, ctx}
    missing_dep = missing_dep(ctx.assigns.fields)

    ctx =
      if missing_dep == ctx.assigns.missing_dep do
        ctx
      else
        broadcast_event(ctx, "missing_dep", %{"dep" => missing_dep})
        assign(ctx, missing_dep: missing_dep)
      end

    broadcast_event(ctx, "update", %{"fields" => ctx.assigns.fields})

    {:noreply, ctx}
  end

  defp to_updates(_fields, "type", value) do
    %{"type" => value}
  end

  defp to_updates(fields, "variable", value) do
    if Kino.SmartCell.valid_variable_name?(value) do
      %{"variable" => value}
    else
      %{"variable" => fields["variable"]}
    end
  end

  def update_deps(ctx) do
    # IO.puts("updating deps: #{inspect(ctx)}")
    %{
      "context_list" => get_context_list(ctx),
      "schema_list" => get_schema_list(ctx.assigns.fields),
      "web_list" => get_web_list(ctx.assigns.fields),
      "context_apps_list" => get_context_apps_list(ctx.assigns.fields),
      "module_list" => get_module_list(ctx.assigns.fields)
    }
  end

  def get_context_list(ctx) do
    # IO.puts("GET CONTEXT LIST: #{inspect(ctx)}")
    case ctx do
      context ->
        IO.puts("CONTEXT: #{inspect(context)}")
        case context.assigns |> Map.fetch(:blueprint) do
          {:ok, blueprint} ->
            case blueprint |> Map.fetch(:metadata) do
              {:ok, metadata} ->
                metadata
                |> Enum.filter(fn element -> element["type"] == "Context" end)
                |> Enum.map(fn element -> %{label: element["context"], value: element["context"] } end)
              _ ->
                []
            end
          _ ->
            []
        end
    end
  end

  def get_schema_list(ctx) do
    case ctx do
      %{} ->
        []

      context ->
        context.assigns
        |> Map.fetch!(:blueprint)
        |> Map.fetch!(:metadata)
        |> Enum.filter(fn element -> element["type"] == "Schema" end)
        |> Enum.map(fn element -> %{label: element["name"], value: element["name"] } end)
    end
  end

  def get_web_list(ctx) do
    case ctx do
      %{} ->
        []

      context ->
        context
        |> Map.fetch!(:blueprint)
        |> Map.fetch!(:metadata)
        |> Enum.filter(fn element -> element["type"] == "Web" end)
        |> Enum.map(fn element -> %{label: element["name"], value: element["name"] } end)
    end
  end

  def get_context_apps_list(ctx) do
    case ctx do
      %{} ->
        []

      context ->
        context
        |> Map.fetch!(:blueprint)
        |> Map.fetch!(:metadata)
        |> Enum.filter(fn element -> element["type"] == "ContextApp" end)
        |> Enum.map(fn element -> %{label: element["context_app"], value: element["context_app"] } end)
    end
  end

  def get_module_list(ctx) do
    case ctx do
      %{} ->
        []

      context ->
        context
        |> Map.fetch!(:blueprint)
        |> Map.fetch!(:metadata)
        |> Enum.filter(fn element -> element["type"] == "Module" end)
        |> Enum.map(fn element -> %{label: element["module"], value: element["module"] } end)
    end
  end

  defp to_updates(_fields, field, value), do: %{field => value}
  @default_keys ["type"]
  defp required_attrs_from_type(type) do
    case type do
      "App" ->
        ~w|path|

      "Html" ->
        ~w|context|

      "Auth" ->
        ~w|context|

      "Notifier" ->
        ~w|context notifier_name message_name_list|

      "Cert" ->
        ~w||

      "Channel" ->
        ~w|module|

      "Presence" ->
        ~w||

      "Secret" ->
        ~w||

      "Schema" ->
        ~w|module name path|

      "Context" ->
        ~w|context standalone|

      _ ->
        ~w||
    end
  end

  defp optional_attrs_from_type(type) do
    case type do
      "App" ->
        ~w|umbrella app module database no_assets no_esbuild no_tailwind no_ecto no_gettext no_html no_dashboard no_live no_mailer verbose version install no_install binary_id|

      "Html" ->
        ~w|iweb context_app no_schema no_context|

      "Auth" ->
        ~w|web hashing_lib no_live live|

      "Notifier" ->
        ~w|context_app|

      "Cert" ->
        ~w|app domain url output_path cert_name|

      "Channel" ->
        ~w||

      "Presence" ->
        ~w|module|

      "Secret" ->
        ~w|length|

      "Schema" ->
        ~w|no_migration table binary_id repo migration_dir prefix context_app|

      "Context" ->
        ~w|no_merge_with_existing_context merge_with_existing_context no_schema|

      _ ->
        ~w||
    end
  end

  defp attrs_from_type(type) do
    case type do
      "App" ->
        ~w|path app module database no_assets no_esbuild no_tailwind no_ecto no_gettext no_html no_dashboard no_live no_mailer verbose version install no_install binary_id|

      "Html" ->
        ~w|context schema web context_app no_schema no_context|

      "Auth" ->
        ~w|context schema web hashing_libe live no_live|

      "Notifier" ->
        ~w|notifier_name message_name_list context context_app|

      "Cert" ->
        ~w|app domain url output_path cert_name|

      "Channel" ->
        ~w|module|

      "Presence" ->
        ~w|module|

      "Secret" ->
        ~w|length|

      "Schema" ->
        ~w|module name table repo migration_dir prefix no_migration binary_id context_app fields|

      "Context" ->
        ~w|context no_merge_with_existing_context merge_with_existing_context no_schema standalone|

      _ ->
        ~w||
    end
  end

  @impl true
  def to_attrs(%{assigns: %{fields: fields}}) do
    cell_keys = attrs_from_type(fields["type"])
    Map.take(fields, @default_keys ++ cell_keys)
  end

  @impl true
  def to_attrs(%{assigns: %{blueprint: blueprint}}) do
    blueprint
  end

  @impl true
  def to_attrs(ctx) do
    # IO.puts("to_attrs NO MATCH: #{inspect(ctx)}")
    ctx
  end

  @impl true
  def to_source(attrs) do
    # IO.puts("Original attrs: #{inspect(attrs)}")

    case attrs |> Map.fetch("type") do
      {:ok, type} ->
        required_keys = required_attrs_from_type(type)

        _conditional_keys = optional_attrs_from_type(attrs["type"])

        if all_fields_filled?(attrs, required_keys) do
          attrs |> to_quoted() |> Kino.SmartCell.quoted_to_string()
        else
          quote do
            {:error, "Not all required fields are filled"}
          end
          |> Kino.SmartCell.quoted_to_string()
        end

      _ ->
        # IO.puts("No type found")
        ""
    end
  end

  defp all_fields_filled?(attrs, keys) do
    case keys do
      [] -> true
      _ -> Enum.all?(keys, fn key -> attrs[key] not in [nil, "", []] end)
    end
  end

  defp any_fields_filled?(_, []), do: true

  defp any_fields_filled?(attrs, keys) do
    Enum.any?(keys, fn key -> attrs[key] not in [nil, "", []] end)
  end

  # TODO: implement to quoted with GenDSL Element map attrs for all elements
  defp to_quoted(%{"type" => "App"} = attrs) do
    attrs =
      attrs
      |> Map.filter(fn {_key, val} ->
        val not in [nil, "", []]
      end)

    quote do
      blueprint =
        %{
          metadata: [],
          dependencies: [],
          pretasks: [],
          generable_elements: [
            unquote(attrs)
          ],
          posttasks: []
        }
      {:ok, "Added: App"}
    end
  end

  defp to_quoted(%{"type" => type, "standalone" => false} = attrs)
       when type in @generable_elements do
    IO.puts("DEPENDENCY DETECTED: #{inspect(attrs)}")

    attrs =
      attrs
      |> Map.filter(fn {_key, val} ->
        val not in [nil, "", []]
      end)

    quote do
      blueprint =
        blueprint
        |> Map.update!(:metadata, &(&1 ++ [unquote(attrs)]))
      {:ok, "Added: " <> unquote(attrs["type"])}
    end
  end

  defp to_quoted(%{"type" => type} = attrs) when type in @generable_elements do
    attrs =
      attrs
      |> Map.filter(fn {_key, val} ->
        val not in [nil, "", []]
      end)

    quote do
      blueprint =
        blueprint
        |> Map.update!(:generable_elements, &(&1 ++ [unquote(attrs)]))
      {:ok, "Added: " <> unquote(attrs["type"])}
    end
  end

  defp to_quoted(_attr) do
    # IO.puts("to_quoted everything else: #{inspect(attr)}")

    quote do
      :ok
    end
  end

  @impl true
  def scan_binding(pid, binding, env) do
    # IO.puts("Scanning binding: #{inspect(binding)}")
    send(pid, {:scan_binding_result, binding, env})
  end

  @impl true
  def handle_info({:scan_binding_result, binding, _env}, ctx) do
    # IO.puts("Scanning binding result: #{inspect(binding)}")

    ctx =
      case List.keyfind(binding, :blueprint, 0) do
        {_key, blueprint} ->
          assign(ctx, blueprint: blueprint)

        # broadcast_event(ctx, "blueprint", blueprint) # TODO: check again that this is not needed to propagate the blueprint, and document why it is being shared by other method
        nil ->
          ctx
      end

    {:noreply, ctx}
  end

  defp missing_dep(%{"type" => "postgres"}) do
    unless Code.ensure_loaded?(Postgrex) do
      ~s/{:postgrex, "~> 0.16.3"}/
    end
  end

  defp missing_dep(%{"type" => "mysql"}) do
    unless Code.ensure_loaded?(MyXQL) do
      ~s/{:myxql, "~> 0.6.2"}/
    end
  end

  defp missing_dep(%{"type" => "sqlite"}) do
    unless Code.ensure_loaded?(Exqlite) do
      ~s/{:exqlite, "~> 0.11.0"}/
    end
  end

  defp missing_dep(%{"type" => "bigquery"}) do
    unless Code.ensure_loaded?(ReqBigQuery) do
      ~s|{:req_bigquery, "~> 0.1.0"}|
    end
  end

  defp missing_dep(%{"type" => "athena"}) do
    unless Code.ensure_loaded?(ReqAthena) do
      ~s|{:req_athena, "~> 0.1.1"}|
    end
  end

  defp missing_dep(_ctx), do: nil

  defp join_quoted(quoted_blocks) do
    asts =
      Enum.flat_map(quoted_blocks, fn
        {:__block__, _meta, nodes} -> nodes
        node -> [node]
      end)

    case asts do
      [node] -> node
      nodes -> {:__block__, [], nodes}
    end
  end

  defp help_box(%{"type" => "bigquery"}) do
    if Code.ensure_loaded?(Mint.HTTP) do
      ~s|You must upload your Google BigQuery Credentials (<a href="https://cloud.google.com/iam/docs/creating-managing-service-account-keys" target="_blank">find them here</a>) or authenticate your machine with <strong>gcloud</strong> CLI authentication.|
    end
  end

  defp help_box(_ctx), do: nil
end
