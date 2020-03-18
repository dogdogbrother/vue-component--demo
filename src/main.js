import Vue from 'vue'
import App from './App.vue'
import Alert from '../src/components/alert/alert.js'

Vue.config.productionTip = false

Vue.prototype.$Alert = Alert

new Vue({
  render: h => h(App),
}).$mount('#app')
