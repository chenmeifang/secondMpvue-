<template>
  <div class="others">
    <p class="title">其他</p>
    <div v-for="item in othersList" :key="item" class="othersBox">
      <ul>
        <li>详情：{{ item.detail }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        othersList: []
      }
    },
    onLoad () {
      this.$fly.get('https://www.wjxweb.cn:789/Demand/all/1?type=keywords&value=others')
        .then(res => {
          console.log(res)
          this.othersList = res.data.data
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
.othersBox{
  border:3px solid black;
  margin-left: 20rpx;
  margin-right: 20rpx;
  margin-bottom: 20rpx;
  border-radius: 20px;
  text-align: center
}
</style>
