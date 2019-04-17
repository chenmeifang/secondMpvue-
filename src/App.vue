<script>
  // const app = getApp()

export default {
    // data () {
    //   return {
    //     userInfo: {},
    //     hasUserInfo: false,
    //     canIUse: wx.canIUse('button.open-type.getUserInfo')
    //   }
    // },
    created () {
      // 调用API从本地缓存中获取数据
      /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */

      let logs
      if (mpvuePlatform === 'my') {
        logs = mpvue.getStorageSync({ key: 'logs' }).data || []
        logs.unshift(Date.now())
        mpvue.setStorageSync({
          key: 'logs',
          data: logs
        })
      } else {
        logs = mpvue.getStorageSync('logs') || []
        logs.unshift(Date.now())
        mpvue.setStorageSync('logs', logs)
      }
      // 微信登录取得状态
      //   if (app.globalData.userInfo) {
      //     this.setData({
      //       userInfo: app.globalData.userInfo,
      //       hasUserInfo: true
      //     })
      //   } else if (this.data.canIUse) {
      //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      //   // 所以此处加入 callback 以防止这种情况
      //     app.userInfoReadyCallback = res => {
      //       this.setData({
      //         userInfo: res.userInfo,
      //         hasUserInfo: true
      //       })
      //     }
      //   } else {
      //   // 在没有 open-type=getUserInfo 版本的兼容处理
      //     wx.getUserInfo({
      //       success: res => {
      //         app.globalData.userInfo = res.userInfo
      //         this.setData({
      //           userInfo: res.userInfo,
      //           hasUserInfo: true
      //         })
      //       }
      //     })
      //   }
      // },
      // getUserInfo: function (e) {
      //   console.log(e)
      //   app.globalData.userInfo = e.detail.userInfo
      //   this.setData({
      //     userInfo: e.detail.userInfo,
      //     hasUserInfo: true
      //   })
      var that = this
      wx.getUserInfo({
        success: function (res) {
          // console.log(res.userInfo)
          that.$store.state.userInformation = res.userInfo
        }
      })
    },
    log () {
      console.log(`log at:${Date.now()}`)
    }
}
</script>

<style>
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
