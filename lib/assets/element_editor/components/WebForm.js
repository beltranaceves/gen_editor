import { BaseInput, BaseSwitch } from "./baseComponents.js";

export const WebForm = {
  name: "WebForm",

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
        name="module"
        label=" Module "
        v-model="fields.web"
        selectClass="input-number input--xs"
        v-bind:grow="true"
        :required=true
      />
    </div>
    `,
};

// <small class="help-box" v-if="hasAwsCredentials" v-html="helpBox" />

