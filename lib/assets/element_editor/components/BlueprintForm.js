import { BaseButton, BaseInputNumber } from "./baseComponents.js";

export const BlueprintForm = {
  name: "BlueprintForm",

  components: {
    BaseInputNumber: BaseInputNumber,
    BaseButton: BaseButton,
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
    getBlueprint() {
      return "";
    },
  },

  template: /*HTML*/`
    <div class="row mixed-row row-center">
      Execute this cell to generate the project
      <div class="add-layer add-operation row mixed-row row-left">
        <BaseButton label="Generate Project" @click="generateBlueprint"/>
      </div>
    </div>
    `,
};

// <small class="help-box" v-if="hasAwsCredentials" v-html="helpBox" />

