<template>
  <div class="whole">
    <div class="header">
      <img class="userinfo-avatar" :src="user.avatar" alt="">
      <p>{{ user.nickName }}</p>
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
    width: 128rpx;
    height: 128rpx;
    border-radius: 50%;
    margin: 0 auto;
  }
</style>
