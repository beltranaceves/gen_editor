export const BaseButton = {
props: {
      label: {
        type: String,
        default: "",
      },
    },
    template: `
    <button class="button button--sm button--dashed" type="button" :disabled="noDataFrame"
      @click="$emit('addOperation')">
      <i class="ri-add-line"></i>
      <span class="dashed-button-label">{{ label }}</span>
      <slot>
      </slot>
    </button>
    `,
  };
export const Accordion = {
  data() {
    return {
      isOpen: payload.layers.length <= 3,
    };
  },
  props: {
    hasLayers: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    toggleAccordion() {
      this.isOpen = !this.isOpen;
    },
  },
  template: /*HTML*/`
        <div class="layer-wrapper" :class="{'card': hasLayers}">
          <div
            class="accordion-control"
            :class="{'expanded': isOpen}"
            :aria-expanded="isOpen"
            :aria-controls="id"
            v-show="hasLayers"
          >
            <span>
              <button
                class="button button--toggle"
                @click="toggleAccordion()"
                type="button"
              >
                <svg
                  class="button-svg"
                  :class="{
                    'rotate-0': isOpen,
                    'rotate--90': !isOpen,
                  }"
                  fill="currentColor"
                  stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 10"
                  aria-hidden="true"
                >
                  <path
                    d="M15 1.2l-7 7-7-7"
                  />
                </svg>
                <span class="accordion-title">
                  <slot name="title" />
                  <slot name="subtitle" v-if="!isOpen"/>
                </span>
              </button>
            </span>
            <span></span>
            <div class="layer-controls">
              <slot name="toggle" />
              <button
                class="button button--sm"
                @click="$emit('removeLayer')"
                type="button"
                v-show="hasLayers"
              >
                <svg
                  class="button-svg"
                  fill="currentColor"
                  stroke="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path
                    d="M11.75 3.5H15.5V5H14V14.75C14 14.9489 13.921 15.1397 13.7803 15.2803C13.6397 15.421 13.4489
                     15.5 13.25 15.5H2.75C2.55109 15.5 2.36032 15.421 2.21967 15.2803C2.07902 15.1397 2 14.9489 2
                     14.75V5H0.5V3.5H4.25V1.25C4.25 1.05109 4.32902 0.860322 4.46967 0.71967C4.61032 0.579018 4.80109
                     0.5 5 0.5H11C11.1989 0.5 11.3897 0.579018 11.5303 0.71967C11.671 0.860322 11.75 1.05109 11.75
                     1.25V3.5ZM12.5 5H3.5V14H12.5V5ZM5.75 7.25H7.25V11.75H5.75V7.25ZM8.75
                     7.25H10.25V11.75H8.75V7.25ZM5.75 2V3.5H10.25V2H5.75Z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div class="accordion-body" :class="{'expanded': !hasLayers}" v-show="isOpen || !hasLayers">
            <slot name="content" />
          </div>
        </div>
      `,
};

export const FieldGroup = {
  props: {
    modelValue: {
      type: Array,
      required: true,
    },
    inputType: {
      type: String,
      default: "text",
    },
  },
  methods: {
    updateModel(idx, value) {
      this.modelValue[idx] = value;
      this.$emit("groupChange");
    },
  },
  template: /*HTML*/`
        <div v-for="(value, index) in modelValue" class="field" v-bind="$attrs">
          <input
            :type="inputType"
            :value="value"
            v-bind="$attrs"
            class="input"
            @change="updateModel(index, $event.target.value)"
          >
        </div>
      `,
};
export const BaseSelect = {
  name: "BaseSelect",

  props: {
    label: {
      type: String,
      default: "",
    },
    selectClass: {
      type: String,
      default: "input",
    },
    modelValue: {
      type: String,
      default: "",
    },
    options: {
      type: Array,
      default: [],
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
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
    available(value, options) {
      return value
        ? options.map((option) => option.value).includes(value)
        : true;
    },
  },

  computed: {
    emptyClass() {
      if (this.modelValue === "") {
        return "empty";
      }
    },
  },

  template: /*HTML*/`
    <div v-bind:class="[inline ? 'inline-field' : 'field', grow ? 'grow' : '']">
      <label v-bind:class="inline ? 'inline-input-label' : 'input-label'">
        {{ label }}
      </label>
      <select
        :value="modelValue"
        v-bind="$attrs"
        @change="$emit('update:modelValue', $event.target.value)"
        v-bind:class="[selectClass, { unavailable: !available(modelValue, options) }, emptyClass]"
        :required="required"
      >
        <option v-if="!required && !available(modelValue, options)"></option>
        <option
          v-for="option in options"
          :value="option.value"
          :key="option"
          :selected="option.value === modelValue"
        >{{ option.label }}</option>
        <option
          v-if="!available(modelValue, options)"
          class="unavailable"
          :value="modelValue"
        >{{ modelValue }}</option>
      </select>
    </div>
    `,
};

export const BaseInputNumber = {
  name: "BaseInput",

  props: {
    label: {
      type: String,
      default: "",
    },
    inputClass: {
      type: String,
      default: "input",
    },
    modelValue: {
      type: [String, Number],
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
    number: {
      type: Boolean,
      default: false,
    },
    emits: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: "text",
    },
    min: {
      type: String,
      default: "",
    },
  },

  computed: {
    emptyClass() {
      if (this.modelValue === "") {
        return "empty";
      }
    },
  },

  template: /*HTML*/`
    <div v-bind:class="[inline ? 'inline-field' : 'field', grow ? 'grow' : '']">
      <label v-bind:class="inline ? 'inline-input-label' : 'input-label'">
        {{ label }}
      </label>
      <input
        type="number"
        min="1"
        :value="modelValue"
        @input="emits && $emit('update:modelValue', $event.target.value)"
        v-bind="$attrs"
        v-bind:class="[inputClass, number ? 'input-number' : '', emptyClass]"
      >
    </div>
    `,
};
export const BaseInput = {
  name: "BaseInput",

  props: {
    label: {
      type: String,
      default: "",
    },
    inputClass: {
      type: String,
      default: "input",
    },
    modelValue: {
      type: [String, Number],
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
    number: {
      type: Boolean,
      default: false,
    },
    emits: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: "text",
    },
    min: {
      type: String,
      default: "",
    },
  },

  computed: {
    emptyClass() {
      if (this.modelValue === "") {
        return "empty";
      }
    },
  },

  template: /*HTML*/`
    <div v-bind:class="[inline ? 'inline-field' : 'field', grow ? 'grow' : '']">
      <label v-bind:class="inline ? 'inline-input-label' : 'input-label'">
        {{ label }}
      </label>
      <input
        type="[number ? 'number' : type]"
        min="min"
        :value="modelValue"
        @input="emits && $emit('update:modelValue', $event.target.value)"
        v-bind="$attrs"
        v-bind:class="[inputClass, number ? 'input-number' : '', emptyClass]"
      >
    </div>
    `,
};


export const BaseSwitch = { //TODO: add on-hover popup with input description, at least for the flags. TODO: rewrite this
  name: "BaseSwitch",

  props: {
    label: {
      type: String,
      default: "",
    },
    modelValue: {
      type: Boolean,
      default: false,
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

  template: /*HTML*/`
    <div v-bind:class="[inline ? 'inline-field' : 'field', grow ? 'grow' : '']">
      <label v-bind:class="inline ? 'switch-inline-input-label' : 'switch-input-label',">
        {{ label }}
      </label>
      <div class="input-container">
        <label class="switch-button">
          <input
            :checked="modelValue"
            type="checkbox"
            @input="$emit('update:modelValue', $event.target.checked)"
            v-bind="$attrs"
            class="switch-button-checkbox"
            v-bind:class="[inputClass, number ? 'input-number' : '']"
          >
          <div class="switch-button-bg" />
        </label>
      </div>
    </div>
    `,
};

export const ElementToggleBox = {
    name: "ToggleBox",

    props: {
      toggle: {
        type: Boolean,
        default: true,
      },
    },
    computed: {
      message() { 
        return "herererererere";
      },
    },

    template: /*HTML*/`
    <div v-bind:class="toggle ? 'hidden' : ''" v-html="message">
      <slot></slot> 
    </div>
    `,
  };

export const BaseSecret = {
  name: "BaseSecret",

  components: {
    BaseInput: BaseInput,
    BaseSelect: BaseSelect,
  },

  props: {
    textInputName: {
      type: String,
      default: "",
    },
    secretInputName: {
      type: String,
      default: "",
    },
    toggleInputName: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    toggleInputValue: {
      type: [String, Number],
      default: "",
    },
    secretInputValue: {
      type: [String, Number],
      default: "",
    },
    textInputValue: {
      type: [String, Number],
      default: "",
    },
    modalTitle: {
      type: String,
      default: "Select secret",
    },
  },

  methods: {
    selectSecret() {
      const preselectName = this.secretInputValue;
      ctx.selectSecret(
        (secretName) => {
          ctx.pushEvent("update_field", {
            field: this.secretInputName,
            value: secretName,
          });
        },
        preselectName,
        { title: this.modalTitle }
      );
    },
  },

  template: /*HTML*/`
      <div class="input-icon-container grow">
        <BaseInput
          v-if="toggleInputValue"
          :name="secretInputName"
          :label="label"
          :value="secretInputValue"
          inputClass="input input-icon"
          :grow
          readonly
          @click="selectSecret"
          @input="$emit('update:secretInputValue', $event.target.value)"
        />
        <BaseInput
          v-else
          :name="textInputName"
          :label="label"
          type="text"
          :value="textInputValue"
          inputClass="input input-icon-text"
          :grow
          @input="$emit('update:textInputValue', $event.target.value)"
        />
        <div class="icon-container">
          <label class="hidden-checkbox">
            <input
              type="checkbox"
              :name="toggleInputName"
              :checked="toggleInputValue"
              @input="$emit('update:toggleInputValue', $event.target.checked)"
              class="hidden-checkbox-input"
            />
            <svg v-if="toggleInputValue" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                  width="22" height="22">
              <path fill="none" d="M0 0h24v24H0z"/>
              <path d="M18 8h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h2V7a6 6 0 1 1 12 0v1zM5
                10v10h14V10H5zm6 4h2v2h-2v-2zm-4 0h2v2H7v-2zm8 0h2v2h-2v-2zm1-6V7a4 4 0 1 0-8 0v1h8z" fill="#000"/>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path fill="none" d="M0 0h24v24H0z"/>
              <path d="M21 3v18H3V3h18zm-8.001 3h-2L6.6 17h2.154l1.199-3h4.09l1.201 3h2.155l-4.4-11zm-1 2.885L13.244
                12h-2.492l1.247-3.115z" fill="#445668"/>
            </svg>
          </label>
        </div>
      </div>
    `,
};