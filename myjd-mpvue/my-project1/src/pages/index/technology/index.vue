<template>
  <div class="technology">
    <p class="title">技术处理</p>
    <div v-for="item in technologyList" :key="item" class="technologyBox">
      <ul>
        <li>详情：{{ item.detail }}</li>
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
      this.$fly.get('https://www.wjxweb.cn:789/Demand/all/1?type=keywords&value=技术处理')
        .then(res => {
          this.technologyList = res.data.data
        })
        .then(err => {
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
  .technologyBox{
    border:3px solid black;
    margin-left: 20rpx;
    margin-right: 20rpx;
    margin-bottom: 20rpx;
    border-radius: 20px;
    text-align: center
  }
</style>
