<template>
  <div class="shareBill">
    <p class="title">拼单</p>
    <div v-for="item in shareBillList" :key="item" class="shareBillBox">
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
        shareBillList: []
      }
    },
    onLoad () {
      this.$fly.get('https://www.wjxweb.cn:789/Demand/all/1?type=keywords&value=shareBill')
        .then(res => {
          console.log(res)
          this.shareBillList = res.data.data
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
  .shareBillBox{
    border:3px solid black;
    margin: 0 20rpx 20rpx 20rpx;
    border-radius: 20px;
    text-align: center
  }
</style>
