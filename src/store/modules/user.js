import { getItem, setItem } from '@/utils/storage.js'
export default {
  namespaced: true,
  state () {
    return {
      userinfo: getItem()
    }
  },
  mutations: {
    setUser (state, obj) {
      state.userinfo = obj
      setItem(obj)
    }
  },
  actions: {},
  getters: {}
}
