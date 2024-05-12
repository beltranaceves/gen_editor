import { BaseInput, BaseSelect } from "./baseComponents.js";

export const PresenceForm = {
  name: "PresenceForm",

  components: {
    BaseInput: BaseInput,
    BaseSelect: BaseSelect,
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
      <BaseSelect
        name="module"
        label=" Module "
        v-model="fields.module"
        selectClass="input input--xs"
        v-bind:grow="true"
        :options="fields.deps.module_list"
      />
    </div>
    `,
};

// <small class="help-box" v-if="hasAwsCredentials" v-html="helpBox" />

