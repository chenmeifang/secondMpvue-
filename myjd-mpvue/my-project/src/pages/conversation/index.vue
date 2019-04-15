<template>
  <div class="whole" title="seed">
    <div class="header">
    <p>最近</p>
    </div>
    <div class="body">
      <i-divider>***</i-divider>
      <div class="linkMan-list"
           @click="nav(item)"
           v-for="(item, index) in list"
           :key="index">
        <div class="contact-name">
          <p class="contact">{{ item.name }}</p>
          <img class="userinfo-avatar" :src=item.avaUrl></div>
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
        list: [
          {
            name: 'wjx',
            avaUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJbdh5dCug9TZBECsmCICB1e3kvPwiaeOTzsaG019ruqMaPORTwVCF93CcMFcibOadsCOQibhmPHHLyQ/132'
          },
          {
            name: 'jxy',
            avaUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJbdh5dCug9TZBECsmCICB1e3kvPwiaeOTzsaG019ruqMaPORTwVCF93CcMFcibOadsCOQibhmPHHLyQ/132'
          }
        ]
      }
    },
    methods: {
      nav (item) {
        wx.navigateTo({
          url: `chatPage/main?name=${item.name}`
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
    background-color: #bdf0db;
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
    background-color: #0f9360;
    color: white;
  }
</style>
