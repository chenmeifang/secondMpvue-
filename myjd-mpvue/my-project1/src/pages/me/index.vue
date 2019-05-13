<template>
  <div class="whole">
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
      <img class="userinfo-avatar" :src=avatar alt="">
      <p>{{ nickName }}</p>
      </block>
    </div>
    <div class="menuRoom">
      <div class="each" @click="goToMyAcceptation">
        <img class="each1" src="../../../static/images/1.png"/>
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
      <div class="each" @click="goToAboutUs">
        <img class="each1" src="../../../static/images/4.png"/>
        <p class="each2">关于小程序</p>
        <p class="each3">></p>
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        canIUse: true,
        avatar: '',
        nickName: ''
      }
    },
    methods: {
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
        this.avatar = res.mp.detail.userInfo.avatarUrl
        this.nickName = res.mp.detail.userInfo.nickName
        this.$store.state.wxInfo = res.mp.detail.userInfo
        console.log(this.$store.state.wxInfo)
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
  .header {
    text-align: center
  }
  .userinfo-avatar {
    width: 250rpx;
    height: 250rpx;
    border-radius: 50%;
    margin-top: 10rpx;
  }
  button {
    margin-top: 10%;
    height: 50px;
    width: 100%;
    text-align: center;
  }
  .menuRoom{
    position: fixed;
    bottom: 290rpx
  }
  .each{
    border:1rpx solid darkgray;
    margin-bottom: 10rpx;
    height:100rpx;
    width: 750rpx;
    line-height: 2.5
  }
  .each1{
    float: left;
    width: 65rpx;
    height: 65rpx;
    margin-top: 15rpx
  }
  .each2{
    float:left;
    margin-left: 30rpx
  }
  .each3{
    float:right;
    margin-right: 25rpx
  }
</style>
