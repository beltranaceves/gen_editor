import { BaseInput, BaseSelect, BaseSwitch } from "./baseComponents.js";

export const SchemaForm = {
  name: "SchemaForm",

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
    <div class="row mixed-row row-center">
      <BaseSelect
        name="module"
        label=" Module "
        v-model="fields.module"
        selectClass="input input--xs"
        v-bind:grow="true"
        :options="fields.deps.module_list"
      />
      <BaseInput
        name="name"
        label=" Name "
        v-model="fields.name"
        selectClass="input-number input--xs"
        v-bind:grow="true"
      />
      <BaseInput
        name="repo"
        label=" Repo "
        v-model="fields.repo"
        selectClass="input-number input--xs"
        v-bind:grow="true"
      />
    </div>
    <div class="row mixed-row row-center">
      <BaseInput
        name="context_app"
        label=" Context App "
        v-model="fields.context_app"
        selectClass="input-number input--xs"
        v-bind:grow="true"
      />
      <BaseInput
        name="prefix"
        label=" Prefix "
        v-model="fields.prefix"
        selectClass="input-number input--xs"
        v-bind:grow="true"
      />
    </div>
    <div class="row mixed-row row-center">
      <BaseInput
        name="migration_dir"
        label=" Migration Directory"
        v-model="fields.migration_dir"
        selectClass="input-number input--xs"
        v-bind:grow="true"
        :disabled="fields.no_migration"
      />
    </div>
    <div class="row mixed-row row-center">
      <BaseSwitch
        name="no_migration"
        label="Migration"
        v-model="fields.no_migration"
      />
      <BaseSwitch
        name="binary_id"
        label="Binary Id"
        v-model="fields.binary_id"
      />
    </div>

    <div class="row mixed-row row-center">
    </div>
    `,
};

// <small class="help-box" v-if="hasAwsCredentials" v-html="helpBox" />

