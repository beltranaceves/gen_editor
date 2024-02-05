import { BaseInput, BaseSelect, BaseSwitch } from "./baseComponents.js";

export const AuthForm = {
  name: "AuthForm",

  components: {
    BaseInput: BaseInput,
    BaseSelect: BaseSelect,
    BaseSwitch: BaseSwitch
  },

  // context, list
  // schema, list
  // web namespace, list. TODO: make this config cell
  // context_app, list. TODO: make this config cell
  // no_context, flag
  // no_schema, flag


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
        :required=true
      />
      <BaseSelect
        name="schema"
        label=" Schema "
        v-model="fields.schema"
        selectClass="input input--xs"
        v-bind:grow="true"
        :options="fields.deps.schema_list"
        :required=true
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
        name="hashing_lib"
        label=" Hashing Libray "
        v-model="fields.hashing_lib"
        selectClass="input input--xs"
        v-bind:grow="true"
        :options="fields.deps.hashing_lib_list"
      />
    </div>
    <div class="row mixed-row row-center">
      <BaseSwitch
        name="live"
        label="Live"
        v-model="fields.live"
      />
      <BaseSwitch
        name="no_live"
        label="No Live"
        v-model="fields.no_live"
      />
    </div>
    `,
};

// <small class="help-box" v-if="hasAwsCredentials" v-html="helpBox" />

