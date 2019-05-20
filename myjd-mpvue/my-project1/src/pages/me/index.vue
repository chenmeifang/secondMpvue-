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
      <img class="avatar" :src="avatarUrl" alt="">
      <p>{{ nickName }}</p>
      </block>
    </div>
    <!-- 这里把图标图片上传到sm.ms了 -->
    <div class="each" @click="goToMyAcceptation">
      <img class="each1" src="https://i.loli.net/2019/05/20/5ce2b989e6e5a20650.png"/>
      <p class="each2">接受的单子</p>
      <p class="each3">></p>
    </div>
    <div class="each" @click="goToMyRelease">
      <img class="each1" src="https://i.loli.net/2019/05/20/5ce2b9b987e7744566.png"/>
      <p class="each2">发布的单子</p>
      <p class="each3">></p>
    </div>
    <div class="each" @click="goToFindUs">
      <img class="each1" src="https://i.loli.net/2019/05/20/5ce2b9d6dd66c58804.png"/>
      <p class="each2">联系开发者</p>
      <p class="each3">></p>
    </div>
    <div class="each lasteach" @click="goToAboutUs">
      <img class="each1" src="https://i.loli.net/2019/05/20/5ce2b9fe547cc93092.png"/>
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
      this.getWindowHeight()
      this.judgeNewUser()
    },
    methods: {
      judgeNewUser () {
        wx.request({
          url: 'https://www.wjxweb.cn:789/User/all/1?type=wxOpen&value=' + this.$store.state.openId,
          method: 'GET',
          header: {
            'content-type': 'application/json'
          },
          success: res => {
            console.log(res)
            if (res.data.count === 1) {
              this.canIUse = false
              // 在这里隐藏的按钮之后，之后每次开启程序vuex里面的userInformation都是空的，会影响其他页面的大部分逻辑
              // 隐藏认证按钮的同时要显示该用户的头像和昵称
              this.$store.state.userInformation = res.data.data[0]
              this.avatarUrl = this.$store.state.userInformation.avatar
              this.nickName = this.$store.state.userInformation.nickName
            }
          },
          fail: err => {
            console.log(err)
          }
        })
      },
      getWindowHeight () {
        wx.getSystemInfo({
          success: res => {
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
        this.$store.state.wxInfo = res.mp.detail.userInfo
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
                  this.avatarUrl = this.$store.state.userInformation.avatar
                  this.nickName = this.$store.state.userInformation.nickName
                  this.canIUse = false
                  console.log('已新建用户', this.$store.state.userInformation)
                })
            }
          })
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
