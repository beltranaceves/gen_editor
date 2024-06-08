import { BaseInput, BaseSwitch } from "./baseComponents.js";

export const ContextAppForm = {
  name: "ContextAppForm",

  components: {
    BaseInput: BaseInput,
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
      return (currentField === "" && otherField === "");
    },
  },

  template: /*HTML*/`
    <div class="row mixed-row row-center">
      <BaseInput
        name="context_app"
        label=" Module "
        v-model="fields.context_app"
        selectClass="input-number input--xs"
        v-bind:grow="true"
        :required=true
      />
    </div>
    `,
};

// <small class="help-box" v-if="hasAwsCredentials" v-html="helpBox" />

