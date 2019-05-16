<template>
  <div>
      <div class="linkMan-list"
           @click="nav(item)"
           v-for="(item, index) in list"
           :key="index">
        <div class="contact">
          <img class="avatar" :src=item.avatar>
          <p class="name">{{ item.nickname }}</p>
        </div>
      </div>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        content: '',
        list: [],
        me: ''
      }
    },
    onLoad () {
      // 这里的执行时机也有问题 不知道什么问题
      // 主要是不明白这一段是干嘛的
      /* this.me = this.$store.state.userInformation[0].id
      console.log(this.$store.state.userInformation)
      this.$fly.get(`https://www.wjxweb.cn:789/Contact/all/1?type=fromWho&value=${this.me}`)
        .then((res) => {
          console.log('联系人', res)
          this.list = res.data.data
        }) */
    },
    onShow () {
      // this.$store.commit('judgeNewUser')
      this.judgeNewUser()
    },
    methods: {
      judgeNewUser () {
        wx.login({
          success: (res) => {
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
                      console.log(res)
                      this.$store.state.userInformation = res.data.data[0]
                      this.me = this.$store.state.userInformation.id
                      // this.me = this.$store.state.userInformation[0].id
                      this.$fly.get(`https://www.wjxweb.cn:789/Contact/all/1?type=fromWho&value=${this.me}`)
                        .then((res) => {
                          console.log('联系人', res)
                          this.list = res.data.data
                        })
                    }
                    if (res.data.data[0] === undefined) {
                      wx.showModal({
                        title: '温馨提示',
                        content: '请先点击上方按钮进行认证',
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
      nav (item) {
        wx.navigateTo({
          url: `chatPage/main?name=${item.nickname}&toWho=${item.toWho}&ava=${item.avatar}`
        })
      }
    }
  }
</script>

<style scoped>
.contact{
  border:1px solid grey;
  height: 150rpx;
}
.avatar {
  width: 128rpx;
  height: 128rpx;
  border-radius: 50%;
  float:left;
  margin-left: 20rpx;
  margin-top: 10rpx
}
</style>
