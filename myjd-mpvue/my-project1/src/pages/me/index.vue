<template>
  <div class="whole">
    <div class="header">
      <img class="userinfo-avatar" :src="user.avatarUrl" alt="">
      <p>{{ user.nickName }}</p>
    </div>
    <div class="menuRoom">
      <i-divider>***</i-divider>
      <i-cell-group>
        <i-cell title="我的信息" />
        <i-cell title="我接受的单子" />
        <i-cell title="我发布的单子" />
        <i-cell title="关于我们"/>
        <i-cell title="联系我们"/>
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
        return this.$store.state.userInformation
      }
    },
    created () {
      // console.log(this.$store.state)
    },
    methods: {
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
