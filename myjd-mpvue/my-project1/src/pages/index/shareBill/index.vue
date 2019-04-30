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
      this.$fly.get('https://www.wjxweb.cn:789/Demand/all/1?type=keywords&value=拼单')
        .then(res => {
          console.log('yyyyyyy')
          this.shareBillList = res.data.data
          // console.log(res)
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
  .shareBillBox{
    border:3px solid black;
    margin-left: 20rpx;
    margin-right: 20rpx;
    margin-bottom: 20rpx;
    border-radius: 20px;
    text-align: center
  }
</style>
