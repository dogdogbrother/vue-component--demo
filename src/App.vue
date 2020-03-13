<template>
  <div id="app">
    <my-form></my-form>
    <my-display></my-display>
  </div>
</template>

<script>
import MyForm from './views/form'
import MyDisplay from './views/display'
export default {
  name: 'app',
  components: {
    MyForm,
    MyDisplay
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
