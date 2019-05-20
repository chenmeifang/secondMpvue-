import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInformation: {},
    /* 应该是对应到数据库user表里面该用户信息，多了一项id（第几位用户）和wxOpen（微信的openid） */
    wxInfo: {},
    /* 点击认证按钮的时候拿到的微信提供的当前用户信息 avatarUrl,city,country,gender,language,nickName,province  */
    openId: '',
    nickname1: '',
    avatar1: '',
    windowHeight: 0,
    windowWidth: 0
  },
  mutations: {
    // 获取屏幕高度和宽度
    getWindowHeight (state) {
      wx.getSystemInfo({
        success: res => {
          state.windowHeight = res.windowHeight
          state.windowWidth = res.windowWidth
        }
      })
    },
    judgeNewUser (state) {
      wx.request({
        url: 'https://www.wjxweb.cn:789/User/all/1?type=wxOpen&value=' + state.openId,
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: res => {
          console.log(res)
          if (res.data.count !== 1) {
            wx.showModal({
              title: '提示',
              content: '建议先跳转至“我的”页面实现点击认证，否则无法正常使用该小程序',
              success (res) {
                if (res.confirm) {
                  wx.switchTab({
                    url: '/pages/me/main'
                  })
                } else if (res.cancel) {
                  wx.switchTab({
                    url: '/pages/index/main'
                  })
                }
              }
            })
          }
        },
        fail: err => {
          console.log(err)
        }
      })
    },
    getUserInformation (state, data) {
      state.userInformation = data
    },
    getWxInfo (state, data) {
      state.wxInfo = data
    },
    getOpenId (state, data) {
      state.openId = data
    }
  }
})
// 使store和vue实例之间创立关系
export default store
