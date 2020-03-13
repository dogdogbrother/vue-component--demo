<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import { findComponentsDownward } from '../../utils/assist.js';
import Emitter from '../../mixins/emitter.js';

export default {
  name: 'iCheckboxGroup',
  mixins: [ Emitter ],
  props: {
    value: {
      type: Array,
      default () {
        return [];
      }
    }
  },
  data () {
    return {
      currentValue: this.value,
      childrens: []
    }
  },
  methods: {
    updateModel (update) {
      this.childrens = findComponentsDownward(this, 'iCheckbox');
      // 通过前面章节定义的方法找到全部的子级 Checkbox
      if (this.childrens) {
        // 假如能找到
        const { value } = this;
        // 拿到自身的 value ,也就是装着 label 的数组
        this.childrens.forEach(child => {
          child.model = value;
          // 遍历每个 Checkbox ,并给他们的 v-model 的值绑定全部的选中值
          if (update) {
            child.currentValue = value.indexOf(child.label) >= 0;
            // 这个 currentValue 的值对应的是 checkbox 原生 true/false ,也要去通过 include 去赋值
            child.group = true;
          }
        });
      }
    },
    change (data) {
      this.currentValue = data;
      this.$emit('input', data);
      this.$emit('on-change', data);
      this.dispatch('iFormItem', 'on-form-change', data);
    }
  },
  watch: {
    value () {
      this.updateModel(true);
    }
  }
}
</script>
