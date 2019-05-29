<template>
  <div>
    <i-notice-bar icon="remind" color="#6495ED" backgroundcolor="#FFFFFF" loop closable>
      若交易谈妥，建议及时删除发布的需求！！！
    </i-notice-bar>
    <div class="whaleAndText" v-show="is" :style="{'left': (windowWidth - 160) / 2 + 'px' }">
      <img class="whale" src="../../../static/images/whale.jpeg"/>
      <span>暂无联系人</span>
    </div>
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
        me: '',
        windowHeight: 0,
        windowWidth: 0,
        is: true
      }
    },
    // 这里把onshow改为onload试试
    onShow () {
      this.$store.commit('judgeNewUser')
      this.windowHeight = this.$store.state.windowHeight
      this.windowWidth = this.$store.state.windowWidth
      this.me = this.$store.state.userInformation.id
      this.$fly.get(`https://www.wjxweb.cn:789/Contact/all/1?type=fromWho&value=${this.me}`)
        .then(res => {
          console.log(res)
          this.list = res.data.data
          if (res.data.data.length !== 0) {
            this.is = false
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    methods: {
      nav (item) {
        wx.navigateTo({
          url: `chatPage/main?name=${item.nickname}&toWho=${item.toWho}&ava=${item.avatar}`
        })
      }
    }
  }
</script>

<style scoped>
.whaleAndText{
  width: 160px;
  position: relative;
  top:70px;
  text-align: center
}
.whale{
  width: 160px;
  height: 120px;
}
span{
  color: #495060;
  font-size: 15px
}
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
