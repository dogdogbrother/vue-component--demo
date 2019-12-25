<template>
  <div id="app">
    <my-form></my-form>
  </div>
</template>

<script>
import MyForm from './views/form'
export default {
  name: 'app',
  components: {
    MyForm
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
