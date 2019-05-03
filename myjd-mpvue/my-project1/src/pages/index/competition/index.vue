<template>
  <div class="twoHandsBook">
    <p class="title">竞赛组队</p>
    <div v-for="item in competitionList" :key="item" class="competitionBox">
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
        competitionList: []
      }
    },
    onLoad () {
      this.$fly.get('https://www.wjxweb.cn:789/Demand/all/1?type=keywords&value=comp')
        .then(res => {
          console.log(res)
          this.competitionList = res.data.data
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
.competitionBox{
  border:3px solid black;
  margin: 0 20rpx 20rpx 20rpx;
  border-radius: 20px;
}
</style>
