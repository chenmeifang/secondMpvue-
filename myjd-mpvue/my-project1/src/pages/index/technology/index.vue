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
    border-left: 2px solid cornflowerblue;
    border-right: 2px solid cornflowerblue;
    border-top: 2px solid cornflowerblue;
    margin-left: 2rpx;
    margin-right: 2rpx;
    margin-bottom: 2rpx
  }
</style>
