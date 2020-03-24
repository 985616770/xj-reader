import Vue from 'vue'
import Vuex from 'vuex'
import book from '@/store/modules/book'
import store from '@/store/modules/store'
import getters from '@/store/getters'
import actions from '@/store/actions'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    book,
    store
  },
  getters,
  actions
})
