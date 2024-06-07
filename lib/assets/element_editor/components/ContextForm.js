import { BaseInput, BaseSelect, BaseSwitch } from "./baseComponents.js";

export const ContextForm = {
  name: "ContextForm",

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
// HACK: the fields.standalone || false is a hack to make the standalone switch work without overriding the value of the standalone field in other smartcells
  template: /*HTML*/`
    <div class="row mixed-row row-center">
      <BaseInput
        name="context"
        label=" Context "
        type="text"
        inputClass="input"
        v-model="fields.context"
        selectClass="input-number input--xs"
        v-bind:grow="true"
        :required=true
      />
      <BaseSelect
        name="schema"
        label=" Schema "
        v-model="fields.schema"
        selectClass="input input--xs"
        v-bind:grow="true"
        :options="fields.deps.schema_list"
        :disabled="!fields.standalone || fields.no_schema"
        :required="!fields.standalone || !fields.no_schema"
      />
      <BaseSwitch
        name="standalone"
        label="Standalone"
        v-model="fields.standalone"
      />
    </div>
    <div class="row mixed-row row-center">
      <BaseSwitch
        name="merge_with_existing_context"
        label="Merge"
        v-model="fields.merge_with_existing_context"
        @change="fields.no_merge_with_existing_context = !fields.merge_with_existing_context"
      />
      <BaseSwitch
        name="no_merge_with_existing_context"
        label="No merge"
        v-model="fields.no_merge_with_existing_context"
        @change="fields.merge_with_existing_context = !fields.no_merge_with_existing_context"
      />
      <BaseSwitch
        name="no_schema"
        label="No Schema"
        v-model="fields.no_schema"
      />
    </div>
    `,
};

// <small class="help-box" v-if="hasAwsCredentials" v-html="helpBox" />

