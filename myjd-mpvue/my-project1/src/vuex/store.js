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
    judgeNewUser (state) {
      wx.login({
        success: function (res) {
          console.log(res)
          const code = res.code
          wx.request({
            url: 'https://www.wjxweb.cn:789/me/wxLogin?code=' + code,
            method: 'POST',
            header: {
              'content-type': 'application/json'
            },
            success: (result) => {
              state.openId = result.data.data.openid
              wx.request({
                url: 'https://www.wjxweb.cn:789/User/all/1?type=wxOpen&value=' + state.openId,
                method: 'GET',
                header: {
                  'content-type': 'application/json'
                },
                success: (res) => {
                  if (res.data.data[0] !== undefined) {
                    state.userInformation = res.data.data[0]
                    state.nickname1 = res.data.data[0].nickName
                    state.avatar1 = res.data.data[0].avatar
                  }
                  if (res.data.data[0] === undefined) {
                    wx.showModal({
                      title: '温馨提示',
                      content: '是否跳转到‘我的‘界面进行点击认证，否则无法正常运行该小程序',
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
            fail: (err) => {
              console.log(err)
            }
          })
        }
      })
    },
    getWindowHeight (state) {
      wx.getSystemInfo({
        success: res => {
          state.windowHeight = res.windowHeight
          state.windowWidth = res.windowWidth
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
