<template>
  <label>
    <span>
      <input
        v-if="group"
        type="checkbox"
        :disabled="disabled"
        :value="label"
        v-model="model"
        @change="change">
      <input
        v-else
        type="checkbox"
        :disabled="disabled"
        :checked="currentValue"
        @change="change">
    </span>
    <slot></slot>
  </label>
</template>
<script>
  import Emitter from '../../mixins/emitter.js';
  import { findComponentUpward } from '../../utils/assist.js';
   
  export default {
    name: 'iCheckbox',
    mixins: [ Emitter ],
    props: {
      label: {
        type: [String, Number, Boolean]
      },
      disabled: {
        type: Boolean,
        default: false
      },
      value: {
        type: [String, Number, Boolean],
        default: false
      },
      trueValue: {
        type: [String, Number, Boolean],
        default: true
      },
      falseValue: {
        type: [String, Number, Boolean],
        default: false
      }
    },
    data () {
      return {
        model: [],
        group: false,
        parent: null,
        currentValue: this.value
      };
    },
    methods: {
      change (event) {
        if (this.disabled) {
          return false;
        }
      
        const checked = event.target.checked;
        this.currentValue = checked;

        const value = checked ? this.trueValue : this.falseValue;
        // 暴露给外面的值还是配置的值
        this.$emit('input', value);

        if (this.group) {
          this.parent.change(this.model);
        } else {
          this.$emit('on-change', value);
          this.dispatch('iFormItem', 'on-form-change', value);
        }
      },
      updateModel () {
        this.currentValue = this.value === this.trueValue;
      }
    },
    watch: {
      value (val) {
        if (val === this.trueValue || val === this.falseValue) {
          this.updateModel();
        } else {
          throw 'Value should be trueValue or falseValue.';
        }
      }
    },
    mounted () {
      this.parent = findComponentUpward(this, 'iCheckboxGroup');
      // 看能不能找到父级
      if (this.parent) {
        // 能找到的话就用一个字段标识
        this.group = true;
      }

      if (this.group) {
        // 如果是 checkboxGroup ,就用 checkboxGroup组件 内部的逻辑进行初始化赋值
        this.parent.updateModel(true);
      } else {
        // 如果是单个的,就用自己的逻辑初始化赋值
        this.updateModel();
      }
    },
  }
</script>