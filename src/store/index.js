import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
    getToken () {
      return this.state.user.userinfo.token
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
