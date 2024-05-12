import { BaseInput} from "./baseComponents.js";

export const CertForm = {
  name: "CertForm",

  components: {
    BaseInput: BaseInput,
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
      return (currentField === "" && otherField === "");
    },
  },

  template: /*HTML*/`
    <div class="row mixed-row row-center">
      <BaseInput
        name="app"
        label=" App "
        v-model="fields.app"
        type="text"
        inputClass="input"
        :required="false"
        :grow
      />
      <BaseInput
        name="domain"
        label=" Domain "
        v-model="fields.domain"
        inputClass="input input-icon"
        :required="false"
        :grow
      />
      <BaseInput
        name="url"
        label=" URL "
        v-model="fields.url"
        inputClass="input input-icon"
        :required="false"
        :grow
      />
    </div>
    <div class="row mixed-row row-center">
      <BaseInput
        name="output"
        label=" Output Path"
        v-model="fields.output_path"
        inputClass="input input-icon"
        :required="false"
        :grow
      />
      <BaseInput
        name="name"
        label=" Cert Name"
        v-model="fields.cert_name"
        inputClass="input input-icon"
        :required="false"
        :grow
      />
    </div>
    `,
};

// <small class="help-box" v-if="hasAwsCredentials" v-html="helpBox" />

