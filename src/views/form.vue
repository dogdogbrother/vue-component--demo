<template>
  <div>
    <h3>具有数据校验功能的表单组件——Form</h3>
    <i-form ref="form" :model="formValidate" :rules="ruleValidate">
      <i-form-item label="用户名" prop="name">
        <i-input v-model="formValidate.name"></i-input>
      </i-form-item>
      <i-form-item label="邮箱" prop="mail">
        <i-input v-model="formValidate.mail"></i-input>
      </i-form-item>
      <i-form-item label="性别" prop="gender">
        <i-checkboxGroup v-model="formValidate.gender" trueValue="1" falseValue="0">
          <i-checkbox label="男">男</i-checkbox>
          <i-checkbox label="女">女</i-checkbox>
        </i-checkboxGroup>
      </i-form-item>
    </i-form>
    <button @click="handleSubmit">提交</button>
    <button @click="handleReset">重置</button>
  </div>
</template>

<script>
import IForm from '../components/form/form'
import IFormItem from '../components/form/form-item'
import IInput from '../components/input/input'

import ICheckbox from '../components/checkbox/checkbox'
import ICheckboxGroup from '../components/checkbox/checkbox-group'
export default {
  components:{
    IForm,
    IFormItem,
    IInput,
    ICheckbox,
    ICheckboxGroup
  },
  data () {
    return {
      formValidate: {
        name: '',
        mail: '',
        gender: []
      },
      ruleValidate: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        mail: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'change' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' },
        ],
        gender: [
          { type: 'array', required: true, message: '给老子选!', trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          window.alert('提交成功');
        } else {
          window.alert('表单校验失败');
        }
      })
    },
    handleReset () {},
    checkChange (value) {
      console.log(value)
    }
  }
}

</script>
<style scoped>
</style>
