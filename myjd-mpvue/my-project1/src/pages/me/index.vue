<template>
  <div class="whole">
    <div class="header">
      <button v-if="canIUse" class="auth-button" size="default" open-type="getUserInfo" @getuserinfo="onGotUserInfo">点击认证</button>
      <block v-else>
      <img class="userinfo-avatar" :src="user.avatar" alt="">
      <p>{{ user.nickName }}</p>
      </block>
    </div>
    <div class="menuRoom">
      <i-divider>***</i-divider>
      <i-cell-group>
        <i-cell title="我接受的单子" @click="goToMyAcceptation"/>
        <i-cell title="我发布的单子" @click="goToMyRelease" />
        <i-cell title="联系开发者" @click="goToFindUs"/>
        <i-cell title="关于我们" @click="goToAboutUs"/>
      </i-cell-group>
      <i-divider>***</i-divider>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        canIUse: true
      }
    },
    computed: {
      user () {
        return this.$store.state.userInformation[0]
      }
    },
    onLoad () {
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
  .whole{
    text-align: center;
  }
  .header {
  }
  .userinfo-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-top: 10%;
  }
  button {
    margin-top: 10%;
    height: 50px;
    width: 100%;
    text-align: center;
  }
</style>
