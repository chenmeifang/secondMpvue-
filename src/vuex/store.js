import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInformation: {}
  },
  mutations: {
    getUserInformation (state, data) {
      state.userInfoemation = data
    }
  }
})

export default store
