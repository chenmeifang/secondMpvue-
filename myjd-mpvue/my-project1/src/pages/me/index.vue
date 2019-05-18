<template>
  <div class="whole">
    <div class="all" :style="{'height': windowHeight + 'px'}">
    <div class="header">
      <button 
      v-if="canIUse" 
      class="auth-button" 
      size="default" 
      open-type="getUserInfo" 
      @getuserinfo="onGotUserInfo">
      点击认证
      </button>
      <block v-else>
      <img class="avatar" :src=avatarUrl alt="">
      <p>{{ nickName }}</p>
      </block>
    </div>
    <div class="each" @click="goToMyAcceptation">
      <img class="each1" src="../../../static/images/1.png"/>
      <!-- :style="{'line-height': (windowHeight - windowHeight / 4.5 - 175) / 4+ 'px'}" -->
      <p class="each2">接受的单子</p>
      <p class="each3">></p>
    </div>
    <div class="each" @click="goToMyRelease">
      <img class="each1" src="../../../static/images/2.png"/>
      <p class="each2">发布的单子</p>
      <p class="each3">></p>
    </div>
    <div class="each" @click="goToFindUs">
      <img class="each1" src="../../../static/images/3.png"/>
      <p class="each2">联系开发者</p>
      <p class="each3">></p>
    </div>
    <div class="each lasteach" @click="goToAboutUs">
      <img class="each1" src="../../../static/images/4.png"/>
      <p class="each2">关于小程序</p>
      <p class="each3">></p>
    </div>
    <div class="footer" :style="{'height': windowHeight / 4.5 + 'px'}"></div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        canIUse: true,
        avatarUrl: '',
        nickName: '',
        windowHeight: 0
      }
    },
    // 这里一定要写onShow 不能写onLoad！！！！
    onShow () {
      // this.$store.commit('judgeNewUser')
      // 这个地方跟那个隐藏button有一些逻辑冲突
      // this.hideBtn()
      this.judgeNewUser()
      this.getWindowHeight()
    },
    methods: {
      judgeNewUser () {
        wx.login({
          success: (res) => {
            console.log('调用wx.login接口获取登录凭证')
            console.log(res)
            const code = res.code
            wx.request({
              url: 'https://www.wjxweb.cn:789/me/wxLogin?code=' + code,
              method: 'POST',
              header: {
                'content-type': 'application/json'
              },
              success: (result) => {
                this.$store.state.openId = result.data.data.openid
                wx.request({
                  url: 'https://www.wjxweb.cn:789/User/all/1?type=wxOpen&value=' + this.$store.state.openId,
                  method: 'GET',
                  header: {
                    'content-type': 'application/json'
                  },
                  success: (res) => {
                    if (res.data.data[0] !== undefined) {
                      this.canIUse = false
                      // 在这里隐藏的按钮之后，之后每次开启程序vuex里面的userInformation都是空的，会影响其他页面的大部分逻辑
                      // 隐藏认证按钮的同时要显示该用户的头像和昵称
                      this.avatarUrl = res.data.data[0].avatar
                      this.nickName = res.data.data[0].nickName
                      this.$store.state.userInformation = res.data.data[0]
                    }
                    if (res.data.data[0] === undefined) {
                      wx.showModal({
                        title: '温馨提示',
                        content: '请先点击上方按钮进行认证',
                        success (res) {
                          if (res.confirm) {
                            /* wx.switchTab({
                              url: '/pages/me/main'
                            }) */
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
      getWindowHeight () {
        wx.getSystemInfo({
          success: res => {
            console.log(res.windowHeight) /* 可使用窗口高度 */
            console.log(res.screenHeight)/* 屏幕高度 */
            this.windowHeight = res.windowHeight
          }
        })
      },
      goToMyAcceptation () {
        wx.navigateTo({
          url: 'myAcceptation/main'
        })
      },
      goToMyRelease () {
        wx.navigateTo({
          url: 'myRelease/main'
        })
      },
      goToFindUs () {
        wx.navigateTo({
          url: 'findUs/main'
        })
      },
      goToAboutUs () {
        wx.navigateTo({
          url: 'aboutUs/main'
        })
      },
      onGotUserInfo: function (res) {
        wx.showToast({
          title: '认证成功，可正常使用该程序',
          icon: 'none',
          duration: 3000
        })
        console.log(res)
        this.avatarUrl = res.mp.detail.userInfo.avatarUrl
        this.nickName = res.mp.detail.userInfo.nickName
        this.$store.state.wxInfo = res.mp.detail.userInfo
        // 这里拿到的是微信提供的用户信息 如：avatarUrl city country gender nickName language
        if (this.$store.state.openId === '') {
          wx.showToast({
            title: '登录异常，请稍后再试',
            icon: 'none',
            duration: 2000
          })
        } else {
          this.$fly.get(`https://www.wjxweb.cn:789/User/all/1?type=wxOpen&value=${this.$store.state.openId}`)
            .then((user) => {
              if (user.data.count !== 0) {
                // 如果数据库存在记录则返回值，赋值至store
                this.$store.state.userInformation = user.data.data
                this.canIUse = false
                console.log('数据库已存在记录，已获取用户信息', this.$store.state.userInformation)
              }
              if (user.data.count === 0) {
                // 如果数据库不存在记录，则post一条新纪录，将返回值赋值至store
                this.$fly.post('https://www.wjxweb.cn:789/User',
                  {
                    'id': 0,
                    'wxOpen': this.$store.state.openId,
                    'userCity': this.$store.state.wxInfo.city,
                    'nickName': this.$store.state.wxInfo.nickName,
                    'studentNumber': null,
                    'phoneNumber': null,
                    'userNewLogin': new Date(),
                    'avatar': this.$store.state.wxInfo.avatarUrl,
                    'userProvince': this.$store.state.wxInfo.province,
                    'userGender': this.$store.state.wxInfo.gender
                  })
                  .then((postRes) => {
                    this.$store.state.userInformation = postRes.data
                    this.canIUse = false
                    console.log('已新建用户', this.$store.state.userInformation)
                  })
              }
            })
        }
      }
    }
  }
</script>

<style scoped>
.all{
  display: flex;
  flex-direction: column
}
.header{
  margin-bottom: 5px;
  text-align: center;
  padding: 15px
}
.each{
  border-top: 1px solid lightgray;
  flex: 1;
  margin-bottom: 5px
}
.lasteach{
  border-bottom: 1px solid lightgray;
}
.avatar{
  width: 250rpx;
  height: 250rpx;
  border-radius: 50%;
}
  button {
    margin-top: 10%;
    height: 50px;
    width: 100%;
    text-align: center;
  }
  .each1{
    float: left;
    width: 65rpx;
    height: 65rpx;
    margin-top: 15rpx
  }
  .each2{
    float:left;
    margin-left: 30rpx;
    margin-top: 20rpx 
  }
  .each3{
    float:right;
    margin-right: 25rpx;
    margin-top: 20rpx
  }
</style>
