import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInformation: {},
    WxInfo: {},
    openId: ''
  },
  mutations: {
    getUserInformation (state, data) {
      state.userInformation = data
    },
    getWxInfo (state, data) {
      state.Wxinfo = data
    },
    getOpenId (state, data) {
      state.openId = data
    }
  }
})
// 使store和vue实例之间创立关系
export default store