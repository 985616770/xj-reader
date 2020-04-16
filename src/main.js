import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from '@/lang'
import * as fundebug from 'fundebug-javascript'
import fundebugVue from 'fundebug-vue'
import './assets/styles/icon.css'
import './assets/styles/global.scss'
import './utils/boost'
import './utils/create-api'
// import './mock'

fundebug.apikey = '42912f64bd5ca7630a9eee8c9dd4b65de51004c1a8bfaae3093be47db89d7b5e'
fundebugVue(fundebug, Vue)

Vue.config.productionTip = false

Vue.use(VueLazyload, {
  preLoad: 1.4,
  loading: require('@/assets/images/loading.gif'),
  attempt: 1
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
