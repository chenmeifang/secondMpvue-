<template>
  <div class="resource">
    <p class="title">资源类</p>
    <div v-for="item in resourceList" :key="item" class="resourceBox">
      <ul>
        <li>详情：{{ item.detail }}</li>
      </ul>
      <ul>
        <li>报酬：{{ item.price }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        resourceList: []
      }
    },
    onLoad () {
      this.$fly.get('https://www.wjxweb.cn:789/Demand/all/1?type=keywords&value=resource')
        .then(res => {
          console.log(res)
          this.resourceList = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
</script>

<style scoped>
  .title {
    text-align: center;
    margin-bottom: 50rpx
  }
  li{
    margin: 20rpx
  }
  .resourceBox{
    border:3px solid black;
    margin: 0 20rpx 20rpx 20rpx;
    border-radius: 20px;
  }
</style>
