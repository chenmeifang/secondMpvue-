<template>
  <div class="twoHandsBook">
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
    name: 'index',
    data () {
      return {
        shareBillList: []
      }
    },
    onLoad () {
      this.$fly.get('https://www.wjxweb.cn:789/Demand/all/1?type=keywords&value=拼单')
        .then(res => {
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
    border-left: 2px solid cornflowerblue;
    border-right: 2px solid cornflowerblue;
    border-top: 2px solid cornflowerblue;
    margin-left: 2rpx;
    margin-right: 2rpx;
    margin-bottom: 2rpx
  }
</style>
