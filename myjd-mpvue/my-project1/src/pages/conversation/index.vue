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
    onShow () {
      this.me = this.$store.state.userInformation[0].id
      console.log(this.$store.state.userInformation)
      // console.log(this.$store.state.WxInfo)
      this.$fly.get(`https://www.wjxweb.cn:789/Contact/all/1?type=fromWho&value=${this.me}`)
        .then((res) => {
          console.log('联系人', res)
          this.list = res.data.data
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
