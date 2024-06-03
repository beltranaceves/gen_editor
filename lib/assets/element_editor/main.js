import * as Vue from "https://cdn.jsdelivr.net/npm/vue@3.2.26/dist/vue.esm-browser.prod.js";
import { BaseInput, BaseSecret, BaseSelect, BaseSwitch} from "./components/baseComponents.js";
import { AppForm } from "./components/AppForm.js";
import { HTMLForm } from "./components/HTMLForm.js";
import { LiveForm } from "./components/LiveForm.js";
import { JSONForm } from "./components/JSONForm.js";
import { AuthForm } from "./components/AuthForm.js";
import { NotifierForm } from "./components/NotifierForm.js";
import { CertForm } from "./components/CertForm.js";
import { ChannelForm } from "./components/ChannelForm.js";
import { PresenceForm } from "./components/PresenceForm.js";
import { SocketForm } from "./components/SocketForm.js";
import { SecretForm } from "./components/SecretForm.js";
import { SchemaForm } from "./components/SchemaForm.js";
import { EmbeddedForm } from "./components/EmbeddedForm.js";
import { ContextForm } from "./components/ContextForm.js";
import { ModuleForm } from "./components/ModuleForm.js";
import { BlueprintForm } from "./components/BlueprintForm.js";

export function init(ctx, info) {
  ctx.importCSS("main.css");
  ctx.importCSS(
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap"
  );

  ctx.importJS(
    "https://cdn.jsdelivr.net/npm/vue-dndrop@1.2.13/dist/vue-dndrop.min.js"
  );

  const SQLiteForm = {
    name: "SQLiteForm",

    components: {
      BaseInput: BaseInput,
    },

    props: {
      fields: {
        type: Object,
        default: {},
      },
    },

    template: /*HTML*/`
    <div class="row">
      <BaseInput
        name="database_path"
        label="Database Path"
        type="text"
        v-model="fields.database_path"
        inputClass="input"
        :grow
        :required
      />
    </div>
    `,
  };

  const DefaultSQLForm = {
    name: "DefaultSQLForm",

    components: {
      BaseInput: BaseInput,
      BaseSwitch: BaseSwitch,
      BaseSelect: BaseSelect,
      BaseSecret: BaseSecret,
    },

    props: {
      fields: {
        type: Object,
        default: {},
      },
    },

    template: /*HTML*/`
    <div class="row mixed-row">
      <BaseInput
        name="hostname"
        label="Hostname"
        type="text"
        v-model="fields.hostname"
        inputClass="input"
        :grow
        :required
      />
      <BaseInput
        name="port"
        label="Port"
        type="number"
        v-model="fields.port"
        inputClass="input input--xs input--number"
        :grow
        :required
      />
      <BaseSwitch
        name="use_ipv6"
        label="IPv6"
        v-model="fields.use_ipv6"
      />
    </div>
    <div class="row">
      <BaseInput
        name="database"
        label="Database"
        type="text"
        v-model="fields.database"
        inputClass="input"
        :grow
      />
      <BaseInput
        name="username"
        label="User"
        type="text"
        v-model="fields.username"
        inputClass="input"
        :grow
      />
      <BaseSecret
        textInputName="password"
        secretInputName="password_secret"
        toggleInputName="use_password_secret"
        label="Password"
        v-model:textInputValue="fields.password"
        v-model:secretInputValue="fields.password_secret"
        v-model:toggleInputValue="fields.use_password_secret"
        modalTitle="Set password"
      />
    </div>
    `,
  };

  const AthenaForm = {
    name: "AthenaForm",

    components: {
      BaseInput: BaseInput,
      BaseSecret: BaseSecret,
    },

    props: {
      fields: {
        type: Object,
        default: {},
      },
      helpBox: {
        type: String,
        default: "",
      },
      hasAwsCredentials: {
        type: Boolean,
        default: false,
      },
    },

    methods: {
      areFieldsEmpty(currentField, otherField) {
        if (currentField === "" && otherField === "") {
          return true;
        }

        return false;
      },
    },

    template: /*HTML*/`
    <div class="row mixed-row">
      <BaseInput
        name="access_key_id"
        label="Access Key ID"
        type="text"
        v-model="fields.access_key_id"
        inputClass="input"
        :grow
        :required="!hasAwsCredentials"
      />
      <BaseSecret
        textInputName="secret_access_key"
        secretInputName="secret_access_key_secret"
        toggleInputName="use_secret_access_key_secret"
        label="Secret Access Key"
        v-model:textInputValue="fields.secret_access_key"
        v-model:secretInputValue="fields.secret_access_key_secret"
        v-model:toggleInputValue="fields.use_secret_access_key_secret"
        modalTitle="Set secret access key"
      />
    </div>
    <div class="row mixed-row">
      <BaseInput
        name="token"
        label="Session Token"
        type="password"
        v-model="fields.token"
        inputClass="input"
        :grow
      />
      <BaseInput
        name="region"
        label="Region"
        type="text"
        v-model="fields.region"
        inputClass="input"
        :grow
        :required="!hasAwsCredentials"
      />
    </div>
    <div class="row mixed-row">
      <BaseInput
        name="database"
        label="Database"
        type="text"
        v-model="fields.database"
        inputClass="input"
        :grow
        :required
      />
      <BaseInput
        name="workgroup"
        label="Workgroup"
        type="text"
        v-model="fields.workgroup"
        inputClass="input"
        :grow
        :required="!!areFieldsEmpty(fields.workgroup, fields.output_location)"
      />
      <BaseInput
        name="output_location"
        label="Output Location"
        type="url"
        v-model="fields.output_location"
        inputClass="input"
        :grow
        :required="!!areFieldsEmpty(fields.output_location, fields.workgroup)"
      />
    </div>
    <small class="help-box" v-if="hasAwsCredentials" v-html="helpBox" />
    `,
  };

  const BigQueryForm = {
    name: "BigQueryForm",

    components: {
      BaseInput: BaseInput,
    },

    props: {
      fields: {
        type: Object,
        default: {},
      },
      helpBox: {
        type: String,
        default: "",
      },
    },

    methods: {
      credentialsChange(_) {
        this.updateCredentials(this.$refs.credentials.files);
      },

      credentialsClick(_) {
        this.$refs.credentials.click();
      },

      dragOver(event) {
        event.preventDefault();
      },

      dragLeave(_) { },

      drop(event) {
        event.preventDefault();
        this.updateCredentials(event.dataTransfer.files);
      },

      updateCredentials(fileList) {
        const file = fileList[0];

        if (file && file.type === "application/json") {
          const reader = new FileReader();

          reader.onload = (res) => {
            const value = JSON.parse(res.target.result);
            ctx.pushEvent("update_field", { field: "credentials", value });
          };

          reader.readAsText(file);
        }
      },
    },

    template: /*HTML*/`
    <div class="row mixed-row">
      <BaseInput
        name="project_id"
        label="Project ID"
        type="text"
        v-model="fields.project_id"
        inputClass="input"
        :grow
        :required
      />
      <BaseInput
        name="default_dataset_id"
        label="Default Dataset ID (Optional)"
        type="text"
        v-model="fields.default_dataset_id"
        inputClass="input"
        :grow
      />
    </div>
    <div class="row">
      <div class="draggable" @dragover="dragOver" @dragleave="dragLeave" @drop="drop" @click="credentialsClick">
        <label for="credentials">
          Drag your credentials JSON file here<br/>
          or click here to select your file.
        </label>
        <input type="file" ref="credentials" @change="credentialsChange" />
      </div>
    </div>
    <small class="help-box" v-html="helpBox" />
    `,
  };

  const app = Vue.createApp({
    components: {
      BaseInput: BaseInput,
      BaseSelect: BaseSelect,
      SQLiteForm: SQLiteForm,
      DefaultSQLForm: DefaultSQLForm,
      BigQueryForm: BigQueryForm,
      AthenaForm: AthenaForm,
      AppForm: AppForm,
      HTMLForm: HTMLForm,
      LiveForm: LiveForm,
      JSONForm: JSONForm,
      AuthForm: AuthForm,
      NotifierForm: NotifierForm,
      CertForm: CertForm,
      ChannelForm: ChannelForm,
      PresenceForm: PresenceForm,
      SocketForm: SocketForm,
      SecretForm: SecretForm,
      SchemaForm: SchemaForm,
      EmbeddedForm: EmbeddedForm,
      ContextForm: ContextForm,
      ModuleForm: ModuleForm,
      BlueprintForm: BlueprintForm,
    },

    template: /*HTML*/`
    <div class="app" @focus="handleFieldChangeSelector" tabIndex="1">
      <!-- Info Messages -->
      <div class="box box-warning" v-if="missingDep">
        <p>To successfully connect, you need to add the following dependency:</p>
        <pre><code>{{ missingDep }}</code></pre>
      </div>
      <form @change="handleFieldChangeSelector">
        <div class="container">
          <div class="row header">
            <BaseSelect
              name="type"
              label=" Element Type "
              v-model="fields.type"
              selectClass="input input--xs"
              :inline
              :options="availableElements"
            />
          </div>

          <SQLiteForm v-bind:fields="fields" v-if="isSQLite" />
          <BigQueryForm v-bind:fields="fields" v-bind:helpBox="helpBox" v-if="isBigQuery" />
          <AthenaForm v-bind:fields="fields" v-bind:helpBox="helpBox" v-bind:hasAwsCredentials="hasAwsCredentials" v-if="isAthena" />
          <DefaultSQLForm v-bind:fields="fields" v-if="isDefaultDatabase" />
          <AppForm v-bind:fields="fields" v-if="isApp" v-bind:availableDatabaseAdapters="availableDatabaseAdapters"/>
          <HTMLForm v-bind:fields="fields" v-if="isHTML"/>
          <LiveForm v-bind:fields="fields" v-if="isLive"/>
          <JSONForm v-bind:fields="fields" v-if="isJSON"/>
          <AuthForm v-bind:fields="fields" v-if="isAuth"/>
          <NotifierForm v-bind:fields="fields" v-if="isNotifier"/>
          <CertForm v-bind:fields="fields" v-if="isCert"/>
          <ChannelForm v-bind:fields="fields" v-if="isChannel"/>
          <PresenceForm v-bind:fields="fields" v-if="isPresence"/>
          <SocketForm v-bind:fields="fields" v-if="isSocket"/>
          <SecretForm v-bind:fields="fields" v-if="isSecret"/>
          <SchemaForm v-bind:fields="fields" v-if="isSchema"/>
          <EmbeddedForm v-bind:fields="fields" v-if="isEmbedded"/>
          <ContextForm v-bind:fields="fields" v-if="isContext"/>
          <ModuleForm v-bind:fields="fields" v-if="isModule"/>
          <BlueprintForm v-bind:fields="fields" v-if="isBlueprint"/>
          
        </div>
      </form>
    </div>
    `,

    data() {
      return {
        fields: info.fields,
        blueprint: info.blueprint,
        missingDep: info.missing_dep,
        helpBox: info.help_box,
        hasAwsCredentials: info.has_aws_credentials,
        availableElements: [
          { label: "PostgreSQL", value: "postgres" },
          { label: "MySQL", value: "mysql" },
          { label: "SQLite", value: "sqlite" },
          { label: "Google BigQuery", value: "bigquery" },
          { label: "AWS Athena", value: "athena" },
          { label: "App", value: "App" },
          { label: "HTML", value: "Html" },
          { label: "Live", value: "Live" },
          { label: "JSON", value: "Json" },
          { label: "Notifier", value: "Notifier" },
          { label: "Auth", value: "Auth" },
          { label: "Cert", value: "Cert" },
          { label: "Channel", value: "Channel" },
          { label: "Presence", value: "Presence" },
          { label: "Socket", value: "Socket" },
          { label: "Secret", value: "Secret" },
          { label: "Schema", value: "Schema" },
          { label: "Embedded", value: "Embedded" },
          { label: "Context", value: "Context"},
          { label: "Module", value: "Module"},
          { label: "Blueprint", value: "Blueprint" },
        ],
        availableDatabaseAdapters: [
          { label: "PostgreSQL", value: "postgres" },
          { label: "MySQL", value: "mysql" },
          { label: "MSSQL", value: "mssql" },
          { label: "SQLite", value: "sqlite3" }
        ]
      };
    },

    computed: {
      isApp() {
        return this.fields.type === "App";
      },

      isHTML() {
        return this.fields.type === "Html";
      },

      isLive() {
        return this.fields.type === "Live";
      },

      isJSON() {
        return this.fields.type === "Json";
      },

      isAuth() {
        return this.fields.type === "Auth";
      },

      isNotifier() {
        return this.fields.type === "Notifier";
      },

      isCert() {
        return this.fields.type === "Cert";
      },

      isChannel() {
        return this.fields.type === "Channel";
      },

      isSecret() {
        return this.fields.type === "Secret";
      },

      isPresence() {
        return this.fields.type === "Presence";
      },

      isSocket() {
        return this.fields.type === "Socket";
      },

      isSchema() {
        return this.fields.type === "Schema";
      },

      isEmbedded() {
        return this.fields.type === "Embedded";
      },

      isContext() {
        return this.fields.type === "Context";
      },

      isModule() {
        return this.fields.type === "Module";
      },  

      isBlueprint() {
        return this.fields.type === "Blueprint";
      },

      isSQLite() {
        return this.fields.type === "bigquery";
      },

      isAthena() {
        return this.fields.type === "athena";
      },

      isDefaultDatabase() {
        return ["postgres", "mysql"].includes(this.fields.type);
      },
    },

    methods: {
      reload() {
        this.$forceUpdate(); 
      },
      handleFieldChangeSelector(event) {
        console.log("handleFieldChangeSelector: ", event)
        const field = event.target.name;
        if (event.type == "focus") {
          const field = "placeholder";
          let value = "focus reload"; ;
          ctx.pushEvent("update_field", { field, value});
        }
        if (field) {
          let value = null;
          if (["fields", "message_name_list"].includes(field)) {
            value = Vue.toRaw(this.fields[field]);
          } else {
            value = this.fields[field];
          }
          console.log("pushEvent value: ", value)
          ctx.pushEvent("update_field", { field, value });
        }
      },
    },
  }).mount(ctx.root);

  ctx.handleEvent("update", ({ fields }) => {
    console.log("update: ", fields);
    setValues(fields);
  });

  ctx.handleEvent("blueprint", (payload) => {
    console.log("blueprint app: ", app);
    console.log("blueprint: ", payload);
    app.blueprint = payload;
    const field = "placeholder";
    let value = "focus reload"; ;
    ctx.pushEvent("update_field", { field, value});
  });

  ctx.handleEvent("missing_dep", ({ dep }) => {
    app.missingDep = dep;
  });

  ctx.handleSync(() => {
    // Synchronously invokes change listeners
    document.activeElement &&
      document.activeElement.dispatchEvent(
        new Event("change", { bubbles: true })
      );
  });

  function setValues(fields) {
    for (const field in fields) {
      app.fields[field] = fields[field];
    }
  }

  function generateBlueprint() {
    ctx.pushEvent("generate_blueprint");
  }
}
