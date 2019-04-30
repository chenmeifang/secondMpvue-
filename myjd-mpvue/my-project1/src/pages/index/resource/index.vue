<template>
  <div class="resource">
    <p class="title">资源类</p>
    <div v-for="item in resourceList" :key="item" class="resourceBox">
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
        resourceList: []
      }
    },
    onLoad () {
      this.$fly.get('https://www.wjxweb.cn:789/Demand/all/1?type=keywords&value=资源')
        .then(res => {
          console.log('uuuuuuuuu')
          console.log(res.data.data)
          this.resourceList = res.data.data
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
  .resourceBox{
    border:3px solid black;
    margin-left: 20rpx;
    margin-right: 20rpx;
    margin-bottom: 20rpx;
    border-radius: 20px;
    text-align: center
  }
</style>
