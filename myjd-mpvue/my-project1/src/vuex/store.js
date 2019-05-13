import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInformation: {},
    /* 应该是对应到数据库user表里面该用户信息，多了一项id（第几位用户）和wxOpen（微信的openid） */
    WxInfo: {},
    /* 点击认证按钮的时候拿到的微信提供的当前用户信息 avatarUrl,city,country,gender,language,nickName,province  */
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
