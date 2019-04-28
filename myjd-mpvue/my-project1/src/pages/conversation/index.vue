<template>
  <div class="whole" title="seed">
    <div class="header">
      <!-- <p>消息</p> -->
    </div>
    <div class="body">
      <i-divider>***</i-divider>
      <div class="linkMan-list"
           @click="nav(item)"
           v-for="(item, index) in list"
           :key="index">
        <div class="contact-name">
          <p class="contact">{{ item.nickname }}</p>
          <img class="userinfo-avatar" :src=item.avatar>
        </div>
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
      this.me = this.$store.state.userInformation[0].id
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
  .header{
    text-align: center;
  }
  .linkMan-list {
    background: linear-gradient(to bottom right, #63b5f0, #ffe1dd);
    border-radius: 30px;
    margin: 6px;
    line-height: 30px;
  }
  .contact-name {
    text-align: center;
  }
  .userinfo-avatar {
    width: 128rpx;
    height: 128rpx;
    border-radius: 50%;
  }
  .contact {
    background-color: #639cc1;
    color: white;
  }
</style>
