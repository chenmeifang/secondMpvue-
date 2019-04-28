<script>
  // const app = getApp()

export default {
    data () {
      return {
      }
    },
    created () {
      // wx.getUserInfo({
      //   success: wxRes => {
      //     console.log(wxRes)
      //     this.$store.state.wxInfo = wxRes.userInfo
      //   }
      // })
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
              that.$store.state.openId = result.data.data.openid
              console.log('openId', that.$store.state.openId)
            },
            fail: (err) => {
              console.log(err)
            }
          })
        }
      })
    },
    mounted () {
      // setTimeout(this.findUser, 1000)
    },
    log () {
      console.log(`log at:${Date.now()}`)
    },
    methods: {
      // findUser () {
      //   this.$fly.get(`https://www.wjxweb.cn:789/User/all/1?type=wxOpen&value=${this.openId}`)
      //     .then((user) => {
      //       if (user.data.count !== 0) {
      //         // 如果数据库存在记录则返回值，赋值至store
      //         this.$store.state.userInformation = user.data.data
      //         console.log('我的信息', this.$store.state.userInformation)
      //       }
      //       if (user.data.count === 0) {
      //         // 如果数据库不存在记录，则post一条新纪录，将返回值赋值至store
      //         this.$fly.post('https://www.wjxweb.cn:789/User',
      //           {
      //             'id': 0,
      //             'wxOpen': this.openId,
      //             'userCity': this._data.wxInfo.city,
      //             'nickName': this._data.wxInfo.nickName,
      //             'studentNumber': null,
      //             'phoneNumber': null,
      //             'userNewLogin': new Date(),
      //             'avatar': this._data.wxInfo.avatarUrl,
      //             'userProvince': this._data.wxInfo.province,
      //             'userGender': this._data.wxInfo.gender
      //           })
      //           .then((postRes) => {
      //             this.$store.state.userInformation = postRes.data
      //             console.log('我的信息', this.$store.state.userInformation)
      //           })
      //       }
      //     })
      // }
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
