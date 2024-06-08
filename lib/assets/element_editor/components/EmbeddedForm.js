import { BaseButton, BaseInput, BaseSelect, BaseSwitch } from "./baseComponents.js";

export const EmbeddedForm = {
  name: "EmbeddedForm",

  components: {
    BaseInput: BaseInput,
    BaseSelect: BaseSelect,
    BaseSwitch: BaseSwitch,
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
      if (currentField === "" && otherField === "") {
        return true;
      }

      return false;
    },
    addField() {
      this.fields.fields.push({
        field_name: "",
        datatype: "",
      });
			this.$emit("change", this.fields, "Embedded", this.fields.fields);
    },
    removeField(index) {
      this.fields.fields.splice(index, 1);
			this.$emit("change", this.fields, "Embedded", this.fields.fields);
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
        :required
      />
    </div>
    <div class="row mixed-row row-around">
      <label v-bind:class="input-label">
         Field Name
      </label>
      <label v-bind:class="input-label">
         Datatype
      </label>
    </div>
    <div class="row mixed-row row-center" v-for="(item, index) in fields.fields">
      <BaseInput
        name="fields"
        v-model="item.field_name"
        selectClass="input-number input--xs"
        v-bind:grow="true"
        :required
      />
      <BaseSelect
        name="fields"
        v-model="item.datatype"
        selectClass="input input--xs"
        v-bind:grow="true"
        v-bind:emits="false"
        :options="fields.deps.datatype_list"
        :required
      />
      <BaseButton @click="removeField(index)">
        <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24"><path fill="#cb4d4d" d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1zm1 2H6v12h12zm-4.586 6l1.768 1.768l-1.414 1.414L12 15.414l-1.768 1.768l-1.414-1.414L10.586 14l-1.768-1.768l1.414-1.414L12 12.586l1.768-1.768l1.414 1.414zM9 4v2h6V4z"/></svg>
      </>
    </div>
    <div class="add-layer add-operation row mixed-row row-left">
      <BaseButton label="+ Add Field" @click="addField"/>
    </div>
    `,
};

// <small class="help-box" v-if="hasAwsCredentials" v-html="helpBox" />

