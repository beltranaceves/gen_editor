export const BaseButton = {
    props: {
        label: {
            type: String,
            default: "",
        },
    },
    template: `
<button class="button button--sm button--dashed" type="button" :disabled="noDataFrame" @click="$emit('addOperation')">
    <i class="ri-add-line"></i>
    <span class="dashed-button-label">{{ label }}</span>
    <slot>
    </slot>
</button>
`,
};
export const Accordion = {
    data() {
        return {
            isOpen: payload.layers.length <= 3,
        };
    },
    props: {
        hasLayers: {
            type: Boolean,
            required: true,
        },
    },
    methods: {
        toggleAccordion() {
            this.isOpen = !this.isOpen;
        },
    },
    template: /*HTML*/ ` <div class="layer-wrapper" :class="{'card': hasLayers}">
    <div class="accordion-control" :class="{'expanded': isOpen}" :aria-expanded="isOpen" :aria-controls="id" v-show="hasLayers">
        <span>
            <button class="button button--toggle" @click="toggleAccordion()" type="button">
                <svg class="button-svg" :class="{
                    'rotate-0': isOpen,
                    'rotate--90': !isOpen,
                  }" fill="currentColor" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 10" aria-hidden="true">
                    <path d="M15 1.2l-7 7-7-7" />
                </svg>
                <span class="accordion-title">
                    <slot name="title" />
                    <slot name="subtitle" v-if="!isOpen" />
                </span>
            </button>
        </span>
        <span></span>
        <div class="layer-controls">
            <slot name="toggle" />
            <button class="button button--sm" @click="$emit('removeLayer')" type="button" v-show="hasLayers">
                <svg class="button-svg" fill="currentColor" stroke="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M11.75 3.5H15.5V5H14V14.75C14 14.9489 13.921 15.1397 13.7803 15.2803C13.6397 15.421 13.4489
                     15.5 13.25 15.5H2.75C2.55109 15.5 2.36032 15.421 2.21967 15.2803C2.07902 15.1397 2 14.9489 2
                     14.75V5H0.5V3.5H4.25V1.25C4.25 1.05109 4.32902 0.860322 4.46967 0.71967C4.61032 0.579018 4.80109
                     0.5 5 0.5H11C11.1989 0.5 11.3897 0.579018 11.5303 0.71967C11.671 0.860322 11.75 1.05109 11.75
                     1.25V3.5ZM12.5 5H3.5V14H12.5V5ZM5.75 7.25H7.25V11.75H5.75V7.25ZM8.75
                     7.25H10.25V11.75H8.75V7.25ZM5.75 2V3.5H10.25V2H5.75Z" />
                </svg>
            </button>
        </div>
    </div>
    <div class="accordion-body" :class="{'expanded': !hasLayers}" v-show="isOpen || !hasLayers">
        <slot name="content" />
    </div>
    </div>
    `,
};

export const FieldGroup = {
    props: {
        modelValue: {
            type: Array,
            required: true,
        },
        inputType: {
            type: String,
            default: "text",
        },
    },
    methods: {
        updateModel(idx, value) {
            this.modelValue[idx] = value;
            this.$emit("groupChange");
        },
    },
    template: /*HTML*/ `
    <div v-for="(value, index) in modelValue" class="field" v-bind="$attrs">
        <input :type="inputType" :value="value" v-bind="$attrs" class="input" @change="updateModel(index, $event.target.value)">
    </div>
    `,
};
export const BaseSelect = {
    name: "BaseSelect",

    props: {
        label: {
            type: String,
            default: "",
        },
        selectClass: {
            type: String,
            default: "input",
        },
        modelValue: {
            type: String,
            default: "",
        },
        options: {
            type: Array,
            default: [],
            required: true,
        },
        required: {
            type: Boolean,
            default: false,
        },
        inline: {
            type: Boolean,
            default: false,
        },
        grow: {
            type: Boolean,
            default: false,
        },
    },

    methods: {
        available(value, options) {
            return value ?
                options.map((option) => option.value).includes(value) :
                true;
        },
    },

    computed: {
        emptyClass() {
            if (this.modelValue === "") {
                return "empty";
            }
        },
    },

    template: /*HTML*/ `
    <div v-bind:class="[inline ? 'inline-field' : 'field', grow ? 'grow' : '']">
        <label v-bind:class="inline ? 'inline-input-label' : 'input-label'">
            {{ label }}
        </label>
        <select :value="modelValue" v-bind="$attrs" @change="$emit('update:modelValue', $event.target.value)" v-bind:class="[selectClass, { unavailable: !available(modelValue, options) }, emptyClass]" :required="required">
            <option v-if="!required && !available(modelValue, options)"></option>
            <option v-for="option in options" :value="option.value" :key="option" :selected="option.value === modelValue">{{ option.label }}</option>
            <option v-if="!available(modelValue, options)" class="unavailable" :value="modelValue">{{ modelValue }}</option>
        </select>
    </div>
    `,
};

export const BaseInputNumber = {
    name: "BaseInputNumber",

    props: {
        label: {
            type: String,
            default: "",
        },
        inputClass: {
            type: String,
            default: "input",
        },
        modelValue: {
            type: [String, Number],
            default: "",
        },
        inline: {
            type: Boolean,
            default: false,
        },
        grow: {
            type: Boolean,
            default: false,
        },
        number: {
            type: Boolean,
            default: false,
        },
        emits: {
            type: Boolean,
            default: true
        },
        type: {
            type: String,
            default: "text",
        },
        min: {
            type: String,
            default: "",
        },
    },

    computed: {
        emptyClass() {
            if (this.modelValue === "") {
                return "empty";
            }
        },
    },

    template: /*HTML*/ `
    <div v-bind:class="[inline ? 'inline-field' : 'field', grow ? 'grow' : '']">
        <label v-bind:class="inline ? 'inline-input-label' : 'input-label'">
            {{ label }}
        </label>
        <input type="number" min="1" :value="modelValue" @input="emits && $emit('update:modelValue', $event.target.value)" v-bind="$attrs" v-bind:class="[inputClass, number ? 'input-number' : '', emptyClass]">
    </div>
    `,
};
export const BaseInput = {
    name: "BaseInput",

    props: {
        label: {
            type: String,
            default: "",
        },
        inputClass: {
            type: String,
            default: "input",
        },
        modelValue: {
            type: [String, Number],
            default: "",
        },
        inline: {
            type: Boolean,
            default: false,
        },
        grow: {
            type: Boolean,
            default: false,
        },
        number: {
            type: Boolean,
            default: false,
        },
        emits: {
            type: Boolean,
            default: true
        },
        type: {
            type: String,
            default: "text",
        },
        min: {
            type: String,
            default: "",
        },
        required: {
            type: Boolean,
            default: false,
        }
    },

    computed: {
        emptyClass() {
            if (this.modelValue === "") {
                return "empty";
            }
        },
    },

    template: /*HTML*/ `
    <div v-bind:class="[inline ? 'inline-field' : 'field', grow ? 'grow' : '']">
        <label v-bind:class="inline ? 'inline-input-label' : 'input-label'">
            {{ label }}
        </label>
        <input type="[number ? 'number' : type]" min="min" :value="modelValue" @input="emits && $emit('update:modelValue', $event.target.value)" v-bind="$attrs" v-bind:class="[inputClass, number ? 'input-number' : '', -emptyClass]" :required="required">
    </div>
    `,
};


export const BaseSwitch = { //TODO: add on-hover popup with input description, at least for the flags. TODO: rewrite this
    name: "BaseSwitch",

    props: {
        label: {
            type: String,
            default: "",
        },
        modelValue: {
            type: Boolean,
            default: false,
        },
        inline: {
            type: Boolean,
            default: false,
        },
        grow: {
            type: Boolean,
            default: false,
        },
    },

    template: /*HTML*/ `
    <div v-bind:class="[inline ? 'inline-field' : 'field', grow ? 'grow' : '']">
        <label v-bind:class="inline ? 'switch-inline-input-label' : 'switch-input-label',">
            {{ label }}
        </label>
        <div class="input-container">
            <label class="switch-button">
                <input :checked="modelValue" type="checkbox" @input="$emit('update:modelValue', $event.target.checked)" v-bind="$attrs" class="switch-button-checkbox" v-bind:class="[inputClass, number ? 'input-number' : '']">
                <div class="switch-button-bg" />
            </label>
        </div>
    </div>
    `,
};

export const ElementToggleBox = {
    name: "ToggleBox",

    props: {
        toggle: {
            type: Boolean,
            default: true,
        },
        fields: {
            type: Object,
            default: {},
        },
    },
    data() {
        return {
            iframeStyle: {
                width: "100%",
                minHeight: "80rem",
            },
        }
    },
    computed: {
        url() {
            switch (this.fields.type) {
                case "App":
                    return "https://hexdocs.pm/phoenix/Mix.Tasks.Phx.New.html";
                case "Live":
                    return "https://hexdocs.pm/phoenix/Mix.Tasks.Phx.Gen.Live.html";
                case "Auth":
                    return "https://hexdocs.pm/phoenix/Mix.Tasks.Phx.Gen.Auth.html";
                case "Notifier":
                    return "https://hexdocs.pm/phoenix/Mix.Tasks.Phx.Gen.Notifier.html";
                case "Cert":
                    return "https://hexdocs.pm/phoenix/Mix.Tasks.Phx.Gen.Cert.html";
                case "Channel":
                    return "https://hexdocs.pm/phoenix/Mix.Tasks.Phx.Gen.Channel.html";
                case "Context":
                    return "https://hexdocs.pm/phoenix/Mix.Tasks.Phx.Gen.Context.html";
                case "Embedded":
                    return "https://hexdocs.pm/phoenix/Mix.Tasks.Phx.Gen.Embedded.html";
                case "Html":
                    return "https://hexdocs.pm/phoenix/Mix.Tasks.Phx.Gen.Html.html";
                case "Json":
                    return "https://hexdocs.pm/phoenix/Mix.Tasks.Phx.Gen.Json.html";
                case "Schema":
                    return "https://hexdocs.pm/phoenix/Mix.Tasks.Phx.Gen.Schema.html";
                case "secret":
                    return "https://hexdocs.pm/phoenix/Mix.Tasks.Phx.Gen.Secret.html";
                case "Socket":
                    return "https://hexdocs.pm/phoenix/Mix.Tasks.Phx.Gen.Socket.html";
                case "Presence":
                    return "https://hexdocs.pm/phoenix/Mix.Tasks.Phx.Gen.Presence.html";
                case "Release":
                    return "https://hexdocs.pm/phoenix/Mix.Tasks.Phx.Gen.Release.html";
            }

        },

        message() {
            // Switch case statement for this.fields.type that returns formated html strings for each generable element of the phoenix framework through mix phx.gen tasks
            // It includes an example of how to use mix tasks in a terminal as well as mandatory and optional parameters, as well as their required format
            switch (this.fields.type) {
                case "Auth":
                    return /*html*/ `
    <section id="moduledoc">
        <p>Generates authentication logic and related views for a resource.</p>
        <pre><code class="makeup shell" translate="no"><span class="gp unselectable">$ </span><span class="">mix phx.gen.auth Accounts User users
</span></code></pre>
        <p>The first argument is the context module followed by the schema module
            and its plural name (used as the schema table name).</p>
        <p>Additional information and security considerations are detailed in the
            <a href="mix_phx_gen_auth.html" class="no-underline"><code class="inline">mix phx.gen.auth</code> guide</a>.
        </p>
        <p>Authentication views can either be generated to use LiveView by passing
            the <code class="inline">--live</code> option, or they can use conventional Phoenix
            Controllers &amp; Views by passing <code class="inline">--no-live</code>.</p>
        <h2 id="module-password-hashing" class="section-heading">
            <a href="#module-password-hashing" class="hover-link">
                <i class="ri-link-m" aria-hidden="true"></i>
            </a>
            <span class="text">Password hashing</span>
        </h2>
        <p>The password hashing mechanism defaults to <code class="inline">bcrypt</code> for
            Unix systems and <code class="inline">pbkdf2</code> for Windows systems. Both
            systems use the <a href="https://hexdocs.pm/comeonin/">Comeonin interface</a>.</p>
        <p>The password hashing mechanism can be overridden with the
            <code class="inline">--hashing-lib</code> option. The following values are supported:
        </p>
        <ul>
            <li><code class="inline">bcrypt</code> - <a href="https://hex.pm/packages/bcrypt_elixir">bcrypt_elixir</a></li>
            <li><code class="inline">pbkdf2</code> - <a href="https://hex.pm/packages/pbkdf2_elixir">pbkdf2_elixir</a></li>
            <li><code class="inline">argon2</code> - <a href="https://hex.pm/packages/argon2_elixir">argon2_elixir</a></li>
        </ul>
        <h2 id="module-web-namespace" class="section-heading">
            <a href="#module-web-namespace" class="hover-link">
                <i class="ri-link-m" aria-hidden="true"></i>
            </a>
            <span class="text">Web namespace</span>
        </h2>
        <p>By default, the controllers and HTML view will be namespaced by the schema name.
            You can customize the web module namespace by passing the <code class="inline">--web</code> flag with a
            module name</p>
        <p>Which would generate the controllers, views, templates and associated tests nested in the <code class="inline">MyAppWeb.Warehouse</code> namespace:</p>
        <ul>
            <li><code class="inline">lib/my_app_web/controllers/warehouse/user_auth.ex</code></li>
            <li><code class="inline">lib/my_app_web/controllers/warehouse/user_confirmation_controller.ex</code></li>
            <li><code class="inline">lib/my_app_web/controllers/warehouse/user_confirmation_html.ex</code></li>
            <li><code class="inline">lib/my_app_web/controllers/warehouse/user_confirmation_html/new.html.heex</code></li>
            <li><code class="inline">test/my_app_web/controllers/warehouse/user_auth_test.exs</code></li>
            <li><code class="inline">test/my_app_web/controllers/warehouse/user_confirmation_controller_test.exs</code></li>
            <li>and so on...</li>
        </ul>
    </section>`;
                case "Notifier":
                    return /*html*/ `
    <section id="moduledoc">
        <p>Generates a notifier that delivers emails by default.</p>
        <pre><code class="makeup shell" translate="no"><span class="gp unselectable">$ </span><span class="">mix phx.gen.notifier Accounts User welcome_user reset_password confirmation_instructions</span></code></pre>
        <p>This task expects a context module name, followed by a
            notifier name and one or more message names. Messages
            are the functions that will be created prefixed by "deliver",
            so the message name should be "snake_case" without punctuation.</p>
        <p>Additionally a context app can be specified with the flag
            <code class="inline">--context-app</code>, which is useful if the notifier is being
            generated in a different app under an umbrella.
        </p>
        <pre>
            <code class="makeup shell" translate="no"><span class="gp unselectable">$ </span><span class="">mix phx.gen.notifier Accounts User welcome_user --context-app marketing</span></code>
        </pre>
        <p>The app "marketing" must exist before the command is executed.</p>
    </section>
    `;
                case "Cert":
                    return /*html*/ `
    <section id="moduledoc">
        <p>Generates a self-signed certificate for HTTPS testing.</p>
        <pre><code class="makeup shell" translate="no"><span class="gp unselectable">$ </span><span class="">mix phx.gen.cert </span><span class="gp unselectable">$ </span><span class="">mix phx.gen.cert my-app my-app.local my-app.internal.example.com</span></code></pre>
        <p>Creates a private key and a self-signed certificate in PEM format. These files can be referenced in the <code class="inline">certfile</code> and <code class="inline">keyfile</code> parameters of an HTTPS Endpoint.</p>
    </section>
    `;
                case "Channel":
                    return /*html*/ `
    <section id="moduledoc">
        <p>Generates a Phoenix channel.</p>
        <pre><code class="makeup shell" translate="no"><span class="gp unselectable">$ </span><span class="">mix phx.gen.channel Room
</span></code></pre>
        <p>Accepts the module name for the channel</p>
        <p>The generated files will contain:</p>
        <p>For a regular application:</p>
        <ul>
            <li>a channel in <code class="inline">lib/my_app_web/channels</code></li>
            <li>a channel test in <code class="inline">test/my_app_web/channels</code></li>
        </ul>
        <p>For an umbrella application:</p>
        <ul>
            <li>a channel in <code class="inline">apps/my_app_web/lib/app_name_web/channels</code></li>
            <li>a channel test in <code class="inline">apps/my_app_web/test/my_app_web/channels</code></li>
        </ul>
    </section>
    `;
                case "Context":
                    return /*html*/ `
    <section id="moduledoc">
        <p>Generates a context with functions around an Ecto schema.</p>
        <pre><code class="makeup shell" translate="no"><span class="gp unselectable">$ </span><span class="">mix phx.gen.context Accounts User users name:string age:integer
</span></code></pre>
        <p>The first argument is the context module followed by the schema module
            and its plural name (used as the schema table name).</p>
        <p>The context is an Elixir module that serves as an API boundary for
            the given resource. A context often holds many related resources.
            Therefore, if the context already exists, it will be augmented with
            functions for the given resource.</p>
        <p>The schema is responsible for mapping the database fields into an
            Elixir struct.</p>
        <p>Overall, this generator will add the following files to <code class="inline">lib/your_app</code>:</p>
        <ul>
            <li>a context module in <code class="inline">accounts.ex</code>, serving as the API boundary</li>
            <li>a schema in <code class="inline">accounts/user.ex</code>, with a <code class="inline">users</code> table</li>
        </ul>
        <p>A migration file for the repository and test files for the context
            will also be generated.</p>
    </section>
    `;
                case "Embedded":
                    return /*html*/ `
    <section id="moduledoc">
        <p>Generates an embedded Ecto schema for casting/validating data outside the DB.</p>
        <pre><code class="makeup elixir" translate="no"><span class="n">mix</span><span class="w"> </span><span class="n">phx</span><span class="o">.</span><span class="n">gen</span><span class="o">.</span><span class="n">embedded</span><span class="w"> </span><span class="nc">Blog.Post</span><span class="w"> </span><span class="n">title</span><span class="ss">:string</span><span class="w"> </span><span class="n">views</span><span class="ss">:integer</span></code></pre>
        <p>The first argument is the schema module followed by the schema attributes.</p>
        <p>The generated schema above will contain:</p>
        <ul>
            <li>an embedded schema file in <code class="inline">lib/my_app/blog/post.ex</code></li>
        </ul>
    </section>
    `;
                case "Html":
                    return /*html*/ `
    <section id="moduledoc">
        <p>Generates controller with view, templates, schema and context for an HTML resource.</p>
        <pre><code class="makeup elixir" translate="no"><span class="n">mix</span><span class="w"> </span><span class="n">phx</span><span class="o">.</span><span class="n">gen</span><span class="o">.</span><span class="n">html</span><span class="w"> </span><span class="nc">Accounts</span><span class="w"> </span><span class="nc">User</span><span class="w"> </span><span class="n">users</span><span class="w"> </span><span class="n">name</span><span class="ss">:string</span><span class="w"> </span><span class="n">age</span><span class="ss">:integer</span></code></pre>
        <p>The first argument, <code class="inline">Accounts</code>, is the resource's context.
            A context is an Elixir module that serves as an API boundary for closely related resources.</p>
        <p>The second argument, <code class="inline">User</code>, is the resource's schema.
            A schema is an Elixir module responsible for mapping database fields into an Elixir struct.
            The <code class="inline">User</code> schema above specifies two fields with their respective colon-delimited data types:
            <code class="inline">name:string</code> and <code class="inline">age:integer</code>. See <a href="Mix.Tasks.Phx.Gen.Schema.html" class="no-underline"><code class="inline">mix phx.gen.schema</code></a> for more information on attributes.
        </p>
        <p>This generator adds the following files to <code class="inline">lib/</code>:</p>
        <ul>
            <li>a controller in <code class="inline">lib/my_app_web/controllers/user_controller.ex</code></li>
            <li>default CRUD HTML templates in <code class="inline">lib/my_app_web/controllers/user_html</code></li>
            <li>an HTML view collocated with the controller in <code class="inline">lib/my_app_web/controllers/user_html.ex</code></li>
            <li>a schema in <code class="inline">lib/my_app/accounts/user.ex</code>, with an <code class="inline">users</code> table</li>
            <li>a context module in <code class="inline">lib/my_app/accounts.ex</code> for the accounts API</li>
        </ul>
        <p>Additionally, this generator creates the following files:</p>
        <ul>
            <li>a migration for the schema in <code class="inline">priv/repo/migrations</code></li>
            <li>a controller test module in <code class="inline">test/my_app/controllers/user_controller_test.exs</code></li>
            <li>a context test module in <code class="inline">test/my_app/accounts_test.exs</code></li>
            <li>a context test helper module in <code class="inline">test/support/fixtures/accounts_fixtures.ex</code></li>
        </ul>
        <p>If the context already exists, this generator injects functions for the given resource into
            the context, context test, and context test helper modules.</p>
    </section>
    `;
                case "Json":
                    return /*html*/ `
    <section id="moduledoc">
        <p>Generates controller, JSON view, and context for a JSON resource.</p>
        <pre><code class="makeup elixir" translate="no"><span class="n">mix</span><span class="w"> </span><span class="n">phx</span><span class="o">.</span><span class="n">gen</span><span class="o">.</span><span class="n">json</span><span class="w"> </span><span class="nc">Accounts</span><span class="w"> </span><span class="nc">User</span><span class="w"> </span><span class="n">users</span><span class="w"> </span><span class="n">name</span><span class="ss">:string</span><span class="w"> </span><span class="n">age</span><span class="ss">:integer</span></code><button class="copy-button"><svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor" data-darkreader-inline-fill="" style="--darkreader-inline-fill: currentColor;"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></svg><span class="sr-only">copy</span><span aria-live="polite"></span></button></pre>
        <p>The first argument is the context module followed by the schema module
            and its plural name (used as the schema table name).</p>
        <p>The context is an Elixir module that serves as an API boundary for
            the given resource. A context often holds many related resources.
            Therefore, if the context already exists, it will be augmented with
            functions for the given resource.</p>
        <p>The schema is responsible for mapping the database fields into an
            Elixir struct. It is followed by an optional list of attributes,
            with their respective names and types. See <a href="Mix.Tasks.Phx.Gen.Schema.html" class="no-underline"><code class="inline">mix phx.gen.schema</code></a>
            for more information on attributes.</p>
        <p>Overall, this generator will add the following files to <code class="inline">lib/</code>:</p>
        <ul>
            <li>a context module in <code class="inline">lib/app/accounts.ex</code> for the accounts API</li>
            <li>a schema in <code class="inline">lib/app/accounts/user.ex</code>, with an <code class="inline">users</code> table</li>
            <li>a controller in <code class="inline">lib/app_web/controllers/user_controller.ex</code></li>
            <li>a JSON view collocated with the controller in <code class="inline">lib/app_web/controllers/user_json.ex</code></li>
        </ul>
        <p>A migration file for the repository and test files for the context and
            controller features will also be generated.</p>
    </section>
    `;
                case "Live":
                    return /*html*/ `
    <iframe src="https://hexdocs.pm/phoenix/Mix.Tasks.Phx.Gen.Live.html" style="width:100%;min-height:80rem">
        `;
                case "Schema":
                    return /*html*/ `
        <section id="moduledoc">
            <p>Generates an Ecto schema and migration.</p>
            <pre><span class="">mix phx.gen.schema Blog.Post blog_posts title:string views:integer
</span></code><button class="copy-button"><svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor" data-darkreader-inline-fill="" style="--darkreader-inline-fill: currentColor;"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></svg><span class="sr-only">copy</span><span aria-live="polite"></span></button></pre>
            <p>The first argument is the schema module followed by its plural
                name (used as the table name).</p>
            <p>The generated schema above will contain:</p>
            <ul>
                <li>a schema file in <code class="inline">lib/my_app/blog/post.ex</code>, with a <code class="inline">blog_posts</code> table</li>
                <li>a migration file for the repository</li>
            </ul>
            <p>The generated migration can be skipped with <code class="inline">--no-migration</code>.</p>
        </section>
        `;
                case "secret":
                    return /*html*/ `
        <section id="moduledoc">
            <p>Generates a secret and prints it to the terminal.</p>
            <pre><code class="makeup shell" translate="no"><span class="gp unselectable">$ </span><span class="">mix phx.gen.secret [length]
</span></code></pre>
            <p>By default, mix phx.gen.secret generates a key 64 characters long.</p>
            <p>The minimum value for <code class="inline">length</code> is 32.</p>
        </section>
        `;
                case "Socket":
                    return /*html*/ `
        <section id="moduledoc">
            <p>Generates a Phoenix socket handler.</p>
            <pre><code class="makeup shell" translate="no"><span class="gp unselectable">$ </span><span class="">mix phx.gen.socket User
</span></code></pre>
            <p>Accepts the module name for the socket.</p>
            <p>The generated files will contain:</p>
            <p>For a regular application:</p>
            <ul>
                <li>a client in <code class="inline">assets/js</code></li>
                <li>a socket in <code class="inline">lib/my_app_web/channels</code></li>
            </ul>
            <p>For an umbrella application:</p>
            <ul>
                <li>a client in <code class="inline">apps/my_app_web/assets/js</code></li>
                <li>a socket in <code class="inline">apps/my_app_web/lib/my_app_web/channels</code></li>
            </ul>
            <p>You can then generate channels with <a href="Mix.Tasks.Phx.Gen.Channel.html" class="no-underline"><code class="inline">mix phx.gen.channel</code></a>.</p>
        </section>
        `;
            }
        },
    },
    template: /*HTML*/ `
        <div>
            <div class="help-box" v-html="message" v-show="fields.help_box_type == 'simple'">
                <slot></slot>
            </div>
            <iframe v-show="fields.help_box_type == 'iframe'" :src="url" :style="iframeStyle"></iframe>
        </div>
        `,
};

export const BaseSecret = {
    name: "BaseSecret",

    components: {
        BaseInput: BaseInput,
        BaseSelect: BaseSelect,
    },

    props: {
        textInputName: {
            type: String,
            default: "",
        },
        secretInputName: {
            type: String,
            default: "",
        },
        toggleInputName: {
            type: String,
            default: "",
        },
        label: {
            type: String,
            default: "",
        },
        toggleInputValue: {
            type: [String, Number],
            default: "",
        },
        secretInputValue: {
            type: [String, Number],
            default: "",
        },
        textInputValue: {
            type: [String, Number],
            default: "",
        },
        modalTitle: {
            type: String,
            default: "Select secret",
        },
    },

    methods: {
        selectSecret() {
            const preselectName = this.secretInputValue;
            ctx.selectSecret(
                (secretName) => {
                    ctx.pushEvent("update_field", {
                        field: this.secretInputName,
                        value: secretName,
                    });
                },
                preselectName, {
                    title: this.modalTitle
                }
            );
        },
    },

    template: /*HTML*/ `
        <div class="input-icon-container grow">
            <BaseInput v-if="toggleInputValue" :name="secretInputName" :label="label" :value="secretInputValue" inputClass="input input-icon" :grow readonly @click="selectSecret" @input="$emit('update:secretInputValue', $event.target.value)" />
            <BaseInput v-else :name="textInputName" :label="label" type="text" :value="textInputValue" inputClass="input input-icon-text" :grow @input="$emit('update:textInputValue', $event.target.value)" />
            <div class="icon-container">
                <label class="hidden-checkbox">
                    <input type="checkbox" :name="toggleInputName" :checked="toggleInputValue" @input="$emit('update:toggleInputValue', $event.target.checked)" class="hidden-checkbox-input" />
                    <svg v-if="toggleInputValue" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M18 8h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h2V7a6 6 0 1 1 12 0v1zM5
                10v10h14V10H5zm6 4h2v2h-2v-2zm-4 0h2v2H7v-2zm8 0h2v2h-2v-2zm1-6V7a4 4 0 1 0-8 0v1h8z" fill="#000" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M21 3v18H3V3h18zm-8.001 3h-2L6.6 17h2.154l1.199-3h4.09l1.201 3h2.155l-4.4-11zm-1 2.885L13.244
                12h-2.492l1.247-3.115z" fill="#445668" />
                    </svg>
                </label>
            </div>
        </div>
        `,
};