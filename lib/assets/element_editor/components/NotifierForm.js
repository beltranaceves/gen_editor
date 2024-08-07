import { BaseInput, BaseSwitch, BaseSelect, BaseButton } from "./baseComponents.js";

export const NotifierForm = {
	name: "NotifierForm",

	components: {
		BaseInput: BaseInput,
		BaseSelect: BaseSelect,
		BaseSwitch: BaseSwitch,
		BaseButton: BaseButton,
	},

	// context, list
	// name
	// message list
	// context_app, list. 
	// TODO: make this config cell


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
			this.fields.message_names.push("welcome");
			this.$emit("change", this.fields, "Notifier", this.fields.message_names);
		},
		removeField(index) {
			if (this.fields.message_names.length > 1) {
				this.fields.message_names.splice(index, 1);
			}
			this.$emit("change", this.fields, "Notifier", this.fields.message_names);
		}
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
    	<BaseSelect
			name="context"
			label=" Context "
			v-model="fields.context"
			selectClass="input input--xs"
			v-bind:grow="true"
			:options="fields.deps.context_list"
			:required
		/>
		<BaseSelect
			name="context_app"
			label=" Context App "
			v-model="fields.context_app"
			selectClass="input input--xs"
			v-bind:grow="true"
			:options="fields.deps.context_apps_list"
		/>
    </div>
    <div class="row mixed-row row-center" v-for="(item, idx) in fields.message_names">
      <BaseInput
        name="message_names"
        v-model="fields.message_names[idx]"
        selectClass="input-number input--xs"
        :required
      />
      <BaseButton @click="removeField(idx)">
        <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24"><path fill="#cb4d4d" d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1zm1 2H6v12h12zm-4.586 6l1.768 1.768l-1.414 1.414L12 15.414l-1.768 1.768l-1.414-1.414L10.586 14l-1.768-1.768l1.414-1.414L12 12.586l1.768-1.768l1.414 1.414zM9 4v2h6V4z"/></svg>
      </>
    </div>
    <div class="add-layer add-operation row mixed-row row-left">
      <BaseButton label="Add Message" @click="addField"/>
    </div>
    `,
};

// <small class="help-box" v-if="hasAwsCredentials" v-html="helpBox" />

