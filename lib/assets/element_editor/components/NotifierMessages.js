import { BaseInput, BaseSwitch, BaseSelect } from "./baseComponents.js";

export const NotifierMessages = {
    name: "NotifierMessages",

    components: {
        BaseInput: BaseInput,
        BaseSelect: BaseSelect,
        BaseSwitch: BaseSwitch
    },


    props: {
        modelValue: {
            type: Array,
            default: [],
        },
        helpBox: {
            type: String,
            default: "",
        },
        placeholder: {
            type: String,
            default: "",
        },
        label: {
            type: String,
            default: "",
        },
        inline: {
            type: Boolean,
            default: false,
        },
        grow: {
            type: Boolean,
            default: false,
        },
    },

    methods: {
        areFieldsEmpty(currentField, otherField) {
            if (currentField === "" && otherField === "") {
                return true;
            }

            return false;
        },
        addMore() {
            console.log("added one message slot", this.modelValue);
            this.modelValue.push("");
        },
        remove(index) {
            console.log("removed one message slot", this.modelValue);
            this.modelValue.splice(index, 1);
        },
    },

    template: /*HTML*/`
    <div v-bind:class="[inline ? 'inline-field' : 'field', grow ? 'grow' : '']">
        <label v-bind:class="inline ? 'inline-input-label' : 'input-label'">
            {{ label }}
        </label>
        <div class="row mixed-row row-center" v-for="(element, index) in modelValue" :key="index">
            <BaseInput
                name="notifier_name"
                type="text"
                v-model="element"
                inputClass="input"
                placeholder="Eg. Email alert sent"
                :grow
                :required=true
            />
            <button
                type="button"
                class="ml-2 rounded-md border px-3 py-2 bg-red-600 text-white"
                @click="remove(index)"
                v-show="index != 0"
            >
        </div>
    </div>
    <button
        type="button"
        class="button--sm"
        @click="addMore()"
      > add more
    </button>
    `,
};

// <small class="help-box" v-if="hasAwsCredentials" v-html="helpBox" />

