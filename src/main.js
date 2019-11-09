import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'

import { store } from './store/store.js'
import router from './router'
import { createProvider } from './vue-apollo'


Vue.config.productionTip = false

new Vue({
  store,
  router,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
