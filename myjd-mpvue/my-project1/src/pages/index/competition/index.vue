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
      this.$fly.get('https://www.wjxweb.cn:789/Demand/all/1?type=keywords&value=竞赛组队')
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
.competitionBox{
  border:3px solid black;
  margin-left: 20rpx;
  margin-right: 20rpx;
  margin-bottom: 20rpx;
  border-radius: 20px;
  text-align: center
}
</style>
