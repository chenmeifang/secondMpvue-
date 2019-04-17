<template>
  <div class="whole">
    <img class="userinfo-avatar" :src="user.avatarUrl" alt="">
    <p>{{ user.nickName }}</p>
    <div class="menuRoom">
      <i-divider>***</i-divider>
      <i-cell-group>
        <i-cell title="我的信息" />
        <i-cell title="我的记录" />
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
        console.log(this.$store.state)
      },
      methods: {
      }
    }
</script>

<style scoped>
  .whole{
    text-align: center;
  }
  .userinfo-avatar {
    width: 128rpx;
    height: 128rpx;
    border-radius: 50%;
    margin: 0 auto;
  }
  .menuRoom {
    background-color: #f5f7d9;
    border-radius: 50%;
  }
</style>
