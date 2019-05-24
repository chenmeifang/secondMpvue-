<script>
  // const app = getApp()
  // 没有<template>  因为App.vue是整个应用，所以在这不需要去写任何的页面
  // <script里面的内容可以写当前整个应用的声明周期以及全局的那些数据>
export default {
    data () {
      return {
      }
    },
    // created是原生小程序的生命周期函数还是vue组件的生命周期函数？？？------>vue组件的生命周期函数
    created () {
      // 拿到屏幕高度 scroll-view绑定了屏幕高度 否则scroll-view高度为0，会造成能请求到数据，但渲染不上去，因为容器高度为0
      this.$store.commit('getWindowHeight')
      // 用code拿到openId
      const that = this
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
              console.log(result)
              // 将openId存到vuex中
              that.$store.state.openId = result.data.data.openid
              wx.request({
                url: 'https://www.wjxweb.cn:789/User/all/1?type=wxOpen&value=' + that.$store.state.openId,
                method: 'GET',
                header: {
                  'content-type': 'application/json'
                },
                // 若不进行此步操作，用户若不进去“我的”页面而直接操作别的页面会拿不到userInformation里面的内容
                success: res => {
                  console.log(res)
                  that.$store.state.userInformation = res.data.data
                  that.$store.state.nickname1 = that.$store.state.userInformation.nickName
                  that.$store.state.avatar1 = that.$store.state.userInformation.avatar
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
    mounted () {
    },
    log () {
      console.log(`log at:${Date.now()}`)
    },
    methods: {
    }
}
</script>

<style>
/* 全局公共的样式 */
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
