import { BaseInput, BaseSwitch, BaseSelect } from "./baseComponents.js";
import { NotifierMessages } from "./NotifierMessages.js";

export const NotifierForm = {
	name: "NotifierForm",

	components: {
		BaseInput: BaseInput,
		BaseSelect: BaseSelect,
		BaseSwitch: BaseSwitch,
		NotifierMessages: NotifierMessages
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
	},

	template: /*HTML*/`
    <div class="row mixed-row row-center">
		<BaseInput
			name="notifier_name"
			label="Name"
			type="text"
			v-model="fields.notifier_name"
			inputClass="input"
			placeholder="Eg. EmailNotifier"
			:grow
			:required=true
		/>
    	<BaseSelect
			name="context"
			label=" Context "
			v-model="fields.context"
			selectClass="input input--xs"
			v-bind:grow="true"
			:options="fields.deps.context_list"
			:disabled="!fields.no_context"
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
    <div class="row mixed-row row-center">
		<NotifierMessages 
			name="message_list"
			label=" Messages"
			v-bind:grow="true"
			v-model="fields.message_name_list"
		/>
    </div>
    `,
};

// <small class="help-box" v-if="hasAwsCredentials" v-html="helpBox" />

