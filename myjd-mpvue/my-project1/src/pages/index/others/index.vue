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
      this.$fly.get('https://www.wjxweb.cn:789/Demand/all/1?type=keywords&value=其他')
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
  border-left: 2px solid cornflowerblue;
  border-right: 2px solid cornflowerblue;
  border-top: 2px solid cornflowerblue;
  margin-left: 2rpx;
  margin-right: 2rpx;
  margin-bottom: 2rpx
}
</style>
