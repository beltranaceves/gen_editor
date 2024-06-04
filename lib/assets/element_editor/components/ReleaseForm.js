import { BaseInput, BaseSelect } from "./baseComponents.js";

export const ReleaseForm = {
  name: "ReleaseForm",

  components: {
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
      <BaseSwitch
        name="docker"
        label="Docker"
        v-model="fields.docker"
      />
      <BaseSwitch
        name="no_ecto"
        label="No Ecto"
        v-model="fields.no_ecto"
      />
      <BaseSwitch
        name="ecto"
        label="Migrations"
        v-model="fields.ecto"
      />
    </div>
    `,
};

// <small class="help-box" v-if="hasAwsCredentials" v-html="helpBox" />

