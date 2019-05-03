<template>
  <div class="technology">
    <p class="title">技术处理</p>
    <div v-for="item in technologyList" :key="item" class="technologyBox">
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
        technologyList: []
      }
    },
    onLoad () {
      this.$fly.get('https://www.wjxweb.cn:789/Demand/all/1?type=keywords&value=technology')
        .then(res => {
          console.log(res)
          this.technologyList = res.data.data
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
  .technologyBox{
    border:3px solid black;
    margin: 0 20rpx 20rpx 20rpx;
    border-radius: 20px;
  }
</style>
