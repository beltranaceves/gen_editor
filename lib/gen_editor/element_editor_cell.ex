defmodule GenEditor.ElementEditor do
  use Kino.JS, assets_path: "lib/assets/element_editor"
  use Kino.JS.Live
  use Kino.SmartCell, name: "Generable Element"

  @default_port_by_type %{"postgres" => 5432, "mysql" => 3306}

  @impl true
  def init(attrs, ctx) do
    type = attrs["type"] || default_db_type()
    default_port = @default_port_by_type[type]

    password = attrs["password"] || ""
    secret_access_key = attrs["secret_access_key"] || ""

    # TODO: add method to bring all appropriate attributes from GenServer
    # Append map to attrs, so that access is uniform

    deps = %{
      "context_list" => attrs["context_list"] || [],
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
        # TODO: turn this into a repo issue
      ]
    }

    fields = %{
      "UUID" => UUID.uuid1(),
      "variable" => Kino.SmartCell.prefixed_var_name("conn", attrs["variable"]),
      "type" => type,
      "hostname" => attrs["hostname"] || "localhost",
      "database_path" => attrs["database_path"] || "",
      "port" => attrs["port"] || default_port,
      "use_ipv6" => false,
      "username" => attrs["username"] || "",
      "password" => password,
      "use_password_secret" => Map.has_key?(attrs, "password_secret") || password == "",
      "password_secret" => attrs["password_secret"] || "",
      "project_id" => attrs["project_id"] || "",
      "default_dataset_id" => attrs["default_dataset_id"] || "",
      "credentials" => attrs["credentials"] || %{},
      "access_key_id" => attrs["access_key_id"] || "",
      "secret_access_key" => secret_access_key,
      "use_secret_access_key_secret" =>
        Map.has_key?(attrs, "secret_access_key_secret") || secret_access_key == "",
      "secret_access_key_secret" => attrs["secret_access_key_secret"] || "",
      "token" => attrs["token"] || "",
      "region" => attrs["region"] || "us-east-1",
      "workgroup" => attrs["workgroup"] || "",
      "output_location" => attrs["output_location"] || "",
      # Element dependencies
      "deps" => deps,
      # App Element
      "path" => attrs["path"] || "",
      "app" => attrs["app"] || "",
      "module" => attrs["module"] || "",
      "database" => attrs["database"] || "",
      "no_assets" => attrs["no_assets"] || "",
      "no_esbuild" => attrs["no_esbuild"] || "",
      "no_tailwind" => attrs["no_tailwind"] || "",
      "no_ecto" => attrs["no_ecto"] || "",
      "no_gettext" => attrs["no_gettext"] || "",
      "no_html" => attrs["no_html"] || "",
      "no_dashboard" => attrs["no_dashboard"] || "",
      "no_live" => attrs["no_live"] || "",
      "no_mailer" => attrs["no_mailer"] || "",
      "verbose" => attrs["verbose"] || "",
      "version" => attrs["version"] || "",
      "install" => attrs["install"] || "",
      "no_install" => attrs["no_install"] || "",
      "binary_id" => attrs["binary_id"] || "",
      # HTML Element
      "context" => attrs["context"] || "",
      "schema" => attrs["schema"] || "",
      "web" => attrs["web"] || "",
      "context_app" => attrs["context_app"] || "",
      "no_schema" => attrs["no_schema"] || true,
      "no_context" => attrs["no_context"] || true,
      # Notifier Element
      "notifier_name" => attrs["notifier_name"] || "",
      "message_name_list" => attrs["message_name_list"] || [""],
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
      "fields" => attrs["fields"] || [%{"datatype" => "string", "field_name" => "username"}]
    }

    ctx =
      assign(ctx,
        fields: fields,
        missing_dep: missing_dep(fields),
        help_box: help_box(fields),
        has_aws_credentials: Code.ensure_loaded?(:aws_credentials)
      )

    {:ok, ctx}
  end

  @impl true
  def handle_connect(ctx) do
    payload = %{
      fields: ctx.assigns.fields,
      missing_dep: ctx.assigns.missing_dep,
      help_box: ctx.assigns.help_box,
      has_aws_credentials: ctx.assigns.has_aws_credentials
    }

    {:ok, payload, ctx}
  end

  @impl true
  def handle_event("update_field", %{"field" => field, "value" => value}, ctx) do
    updated_fields = to_updates(ctx.assigns.fields, field, value)
    ctx = update(ctx, :fields, &Map.merge(&1, updated_fields))

    missing_dep = missing_dep(ctx.assigns.fields)

    ctx =
      if missing_dep == ctx.assigns.missing_dep do
        ctx
      else
        broadcast_event(ctx, "missing_dep", %{"dep" => missing_dep})
        assign(ctx, missing_dep: missing_dep)
      end

    broadcast_event(ctx, "update", %{"fields" => updated_fields})

    {:noreply, ctx}
  end

  defp to_updates(_fields, "port", value) do
    port =
      case Integer.parse(value) do
        {n, ""} -> n
        _ -> nil
      end

    %{"port" => port}
  end

  defp to_updates(_fields, "type", value) do
    %{"type" => value, "port" => @default_port_by_type[value]}
  end

  defp to_updates(fields, "variable", value) do
    if Kino.SmartCell.valid_variable_name?(value) do
      %{"variable" => value}
    else
      %{"variable" => fields["variable"]}
    end
  end

  defp to_updates(_fields, field, value), do: %{field => value}

  @default_keys ["type", "variable"]

  defp required_attrs_from_type(type) do
    case type do
      "App" ->
        ~w|path|

      "Html" ->
        ~w|context|

      "Auth" ->
        ~w|context |

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

      "sqlite" ->
        ~w|database_path|

      "bigquery" ->
        ~w|project_id default_dataset_id credentials|

      "athena" ->
        ~w|access_key_id secret_access_key_secret token region workgroup output_location database|

      type when type in ["postgres", "mysql"] ->
        ~w|hostname port use_ipv6 username password_secret|

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

      "sqlite" ->
        ~w||

      "bigquery" ->
        ~w||

      "athena" ->
        ~w||

      type when type in ["postgres", "mysql"] ->
        ~w||

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

      "sqlite" ->
        ~w|database_path|

      "bigquery" ->
        ~w|project_id default_dataset_id credentials|

      "athena" ->
        ~w|access_key_id secret_access_key_secret token region workgroup output_location database|

      type when type in ["postgres", "mysql"] ->
        ~w|hostname port use_ipv6 username password_secret|

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
  def to_source(attrs) do
    required_keys = required_attrs_from_type(attrs["type"])

    conditional_keys = optional_attrs_from_type(attrs["type"])

    if all_fields_filled?(attrs, required_keys) and
         any_fields_filled?(attrs, conditional_keys) do
      attrs |> to_quoted() |> Kino.SmartCell.quoted_to_string()
    else
      ""
    end
  end

  defp all_fields_filled?(attrs, keys) do
    not Enum.any?(keys, fn key -> attrs[key] in [nil, "", []] end)
  end

  defp any_fields_filled?(_, []), do: true

  defp any_fields_filled?(attrs, keys) do
    Enum.any?(keys, fn key -> attrs[key] not in [nil, "", []] end)
  end

  defp to_quoted(%{"type" => "sqlite"} = attrs) do
    quote do
      opts = [database: unquote(attrs["database_path"])]

      {:ok, unquote(quoted_var(attrs["variable"]))} = Kino.start_child({Exqlite, opts})
    end
  end

  defp to_quoted(%{"type" => "postgres"} = attrs) do
    quote do
      opts = unquote(shared_options(attrs))

      {:ok, unquote(quoted_var(attrs["variable"]))} = Kino.start_child({Postgrex, opts})
    end
  end

  defp to_quoted(%{"type" => "mysql"} = attrs) do
    quote do
      opts = unquote(shared_options(attrs))

      {:ok, unquote(quoted_var(attrs["variable"]))} = Kino.start_child({MyXQL, opts})
    end
  end

  defp to_quoted(%{"type" => "bigquery"} = attrs) do
    goth_opts_block = check_bigquery_credentials(attrs)

    conn_block =
      quote do
        {:ok, _pid} = Kino.start_child({Goth, opts})

        unquote(quoted_var(attrs["variable"])) =
          Req.new(http_errors: :raise)
          |> ReqBigQuery.attach(
            goth: ReqBigQuery.Goth,
            project_id: unquote(attrs["project_id"]),
            default_dataset_id: unquote(attrs["default_dataset_id"])
          )

        :ok
      end

    join_quoted([goth_opts_block, conn_block])
  end

  # TODO: implement to quoted with GenDSL Element map attrs for all elements
  defp to_quoted(%{"type" => "app"} = attrs) do
    quote do
      unquote(quoted_var(attrs["variable"])) =
        %{
          access_key_id: unquote(attrs["access_key_id"]),
          database: unquote(attrs["database"]),
          output_location: unquote(attrs["output_location"]),
          region: unquote(attrs["region"]),
          secret_access_key: unquote(attrs),
          token: unquote(attrs["token"]),
          workgroup: unquote(attrs["workgroup"])
        }

      :ok
    end
  end

  defp to_quoted(%{"type" => "athena"} = attrs) do
    quote do
      unquote(quoted_var(attrs["variable"])) =
        Req.new(http_errors: :raise)
        |> ReqAthena.attach(
          access_key_id: unquote(attrs["access_key_id"]),
          database: unquote(attrs["database"]),
          output_location: unquote(attrs["output_location"]),
          region: unquote(attrs["region"]),
          secret_access_key: unquote(quoted_access_key(attrs)),
          token: unquote(attrs["token"]),
          workgroup: unquote(attrs["workgroup"])
        )

      :ok
    end
  end

  defp to_quoted(%{"type" => "html"} = attrs) do
    IO.puts("HTML Element not implemented yet")

    quote do
      unquote(quoted_var(attrs["variable"])) =
        %{
          context: unquote(attrs["context"]),
          schema: unquote(attrs["schema"]),
          web: unquote(attrs["web"]),
          context_app: unquote(attrs["context_app"]),
          no_schema: unquote(attrs["no_schema"]),
          no_context: unquote(attrs["no_context"])
        }

      :ok
    end
  end

  defp to_quoted(attr) do
    quote do
      :ok
    end
  end

  defp quoted_access_key(%{"secret_access_key" => password}), do: password

  defp quoted_access_key(%{"secret_access_key_secret" => ""}), do: ""

  defp quoted_access_key(%{"secret_access_key_secret" => secret}) do
    quote do
      System.fetch_env!(unquote("LB_#{secret}"))
    end
  end

  defp check_bigquery_credentials(attrs) do
    case attrs["credentials"] do
      %{"type" => "service_account"} ->
        quote do
          credentials = unquote(Macro.escape(attrs["credentials"]))

          opts = [
            name: ReqBigQuery.Goth,
            http_client: &Req.request/1,
            source: {:service_account, credentials}
          ]
        end

      %{"type" => "authorized_user"} ->
        quote do
          credentials = unquote(Macro.escape(attrs["credentials"]))

          opts = [
            name: ReqBigQuery.Goth,
            http_client: &Req.request/1,
            source: {:refresh_token, credentials}
          ]
        end

      _empty_map ->
        quote do
          opts = [name: ReqBigQuery.Goth, http_client: &Req.request/1]
        end
    end
  end

  defp shared_options(attrs) do
    opts = [
      hostname: attrs["hostname"],
      port: attrs["port"],
      username: attrs["username"],
      password: quoted_pass(attrs),
      database: attrs["database"]
    ]

    if attrs["use_ipv6"] do
      opts ++ [socket_options: [:inet6]]
    else
      opts ++ []
    end
  end

  defp quoted_var(string), do: {String.to_atom(string), [], nil}

  defp quoted_pass(%{"password" => password}), do: password

  defp quoted_pass(%{"password_secret" => ""}), do: ""

  defp quoted_pass(%{"password_secret" => secret}) do
    quote do
      System.fetch_env!(unquote("LB_#{secret}"))
    end
  end

  defp default_db_type() do
    cond do
      Code.ensure_loaded?(Postgrex) -> "postgres"
      Code.ensure_loaded?(MyXQL) -> "mysql"
      Code.ensure_loaded?(Exqlite) -> "sqlite"
      Code.ensure_loaded?(ReqBigQuery) -> "bigquery"
      Code.ensure_loaded?(ReqAthena) -> "athena"
      true -> "postgres"
    end
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

  defp help_box(%{"type" => "athena"}) do
    if Code.ensure_loaded?(:aws_credentials) do
      "You must fill in the fields above accordingly or authenticate your machine with AWS CLI authentication."
    end
  end

  defp help_box(_ctx), do: nil
end
