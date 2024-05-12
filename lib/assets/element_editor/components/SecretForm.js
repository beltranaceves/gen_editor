import { BaseInputNumber } from "./baseComponents.js";

export const SecretForm = {
  name: "SecretForm",

  components: {
    BaseInputNumber: BaseInputNumber,
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
      <BaseInputNumber
        name="length"
        label=" Length "
        v-model="fields.length"
        selectClass="input-number input--xs"
        v-bind:number="true"
        v-bind:grow="true"
      />
    </div>
    `,
};

// <small class="help-box" v-if="hasAwsCredentials" v-html="helpBox" />

