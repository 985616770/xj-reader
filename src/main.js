import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from '@/lang'
import './assets/styles/icon.css'
import './assets/styles/global.scss'
import './utils/boost'
import './utils/create-api'
// import './mock'

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
