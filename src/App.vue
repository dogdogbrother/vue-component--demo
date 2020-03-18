<template>
  <div id="app">
    <my-form></my-form>
    <my-display style="margin-top: 50px;"></my-display>
    <my-alert style="margin-top: 50px;"></my-alert>
  </div>
</template>

<script>
import MyForm from './views/form'
import MyDisplay from './views/display'
import MyAlert from './views/alert'
export default {
  name: 'app',
  components: {
    MyForm,
    MyDisplay,
    MyAlert
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
