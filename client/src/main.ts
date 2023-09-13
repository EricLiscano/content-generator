import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'

process.env.OPENAI_API_KEY='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'
process.env.ORGANIZATION='org-D69JYqbeh24omwp4hTYck8u1'

const options = {
  persist: true
}

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
