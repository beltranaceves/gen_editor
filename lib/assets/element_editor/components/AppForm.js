import { BaseInput, BaseSelect, BaseSwitch } from "./baseComponents.js";


export const AppForm = {
    name: "AppForm",

    components: {
        BaseInput: BaseInput,
        BaseSelect: BaseSelect,
        BaseSwitch: BaseSwitch
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
        availableDatabaseAdapters: {
            type: Array,
            default: [],
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

    template: /*html*/`
    <div class="row mixed-row">
      <BaseInput
        name="path"
        label="Path"
        type="text"
        v-model="fields.path"
        inputClass="input"
        placeholder="Eg. NewApp or C:\\Users\\NewApp"
        :grow
        :required=true
      />
    </div>
    <div class="row mixed-row">
      <BaseInput
        name="app"
        label="App"
        type="text"
        v-model="fields.app"
        inputClass="input"
        :grow
      />
      <BaseInput
        name="module"
        label="Module"
        type="text"
        v-model="fields.module"
        inputClass="input"
        :grow
      />
      <BaseSelect
        name="database"
        label=" Database adapter "
        v-model="fields.database"
        selectClass="input input--xs"
        :options="availableDatabaseAdapters"
      />
    </div>
    <div class="row mixed-row row-center">
      <BaseSwitch
        name="no_assets"
        label="No Assets"
        v-model="fields.no_assets"
      />
      <BaseSwitch
        name="no_esbuild"
        label="No ESbuild"
        v-model="fields.no_esbuild"
      />
      <BaseSwitch
        name="no_tailwind"
        label="No Tailwind"
        v-model="fields.no_tailwind"
      />
      <BaseSwitch
        name="no_ecto"
        label="No Ecto"
        v-model="fields.no_ecto"
      />
      <BaseSwitch
        name="no_gettext"
        label="No GetText"
        v-model="fields.no_gettext"
      />
      <BaseSwitch
        name="no_html"
        label="No HTML"
        v-model="fields.no_html"
      />
      <BaseSwitch
        name="no_dashboard"
        label="No Dashboard"
        v-model="fields.no_dashboard"
      />
    </div>
    <div class="row mixed-row row-center">
      <BaseSwitch
        name="no_live"
        label="No Live"
        v-model="fields.no_live"
      />
      <BaseSwitch
        name="no_mailer"
        label="No Mailer"
        v-model="fields.no_mailer"
      />
      <BaseSwitch
        name="verbose"
        label="Verbose"
        v-model="fields.verbose"
      />
      <BaseSwitch
        name="version"
        label="Version"
        v-model="fields.version"
      />
      <BaseSwitch
        name="install"
        label="Install"
        v-model="fields.install"
        @change="fields.no_install = !fields.install"
      />
      <BaseSwitch
        name="no_install"
        label="No Install"
        v-model="fields.no_install"
        @change="fields.install = !fields.no_install"
      />
      <BaseSwitch
        name="binary_id"
        label="Binary IDs"
        v-model="fields.binary_id"
        v-bind:inverse="true"
      />
    </div>
    <small class="help-box" v-if="hasAwsCredentials" v-html="helpBox" />
    `,
};
