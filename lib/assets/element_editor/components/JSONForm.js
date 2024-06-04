import { BaseInput, BaseSelect, BaseSwitch } from "./baseComponents.js";

export const JSONForm = {
  name: "JSONForm",

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
        name="context"
        label=" Context "
        v-model="fields.context"
        selectClass="input input--xs"
        v-bind:grow="true"
        :options="fields.deps.context_list"
        :disabled="fields.no_context"
        :required="!fields.no_context"
      />
      <BaseSelect
        name="schema"
        label=" Schema "
        v-model="fields.schema"
        selectClass="input input--xs"
        v-bind:grow="true"
        :options="fields.deps.schema_list"
        :disabled="fields.no_schema"
        :required="!fields.no_schema"
      />
    </div>
    <div class="row mixed-row row-center">
      <BaseSelect
        name="web"
        label=" Web namespace "
        v-model="fields.web"
        selectClass="input input--xs"
        v-bind:grow="true"
        :options="fields.deps.web_list"
      />
      <BaseSelect
        name="context_app"
        label=" Context App "
        v-model="fields.context_app"
        selectClass="input input--xs"
        v-bind:grow="true"
        :options="fields.deps.context_apps_list"
      />
    </div>
    <div class="row mixed-row row-center">
      <BaseSwitch
        name="no_context"
        label="No Context"
        v-model="fields.no_context"
      />
      <BaseSwitch
        name="no_schema"
        label="No Schema"
        v-model="fields.no_schema"
      />
    </div>
    `,
};

// <small class="help-box" v-if="hasAwsCredentials" v-JSON="helpBox" />

