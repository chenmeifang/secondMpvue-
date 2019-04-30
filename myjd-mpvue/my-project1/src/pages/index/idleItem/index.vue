<template>
  <div class="idleItem">
    <p class="title">闲置物转出</p>
    <div v-for="item in itemList" :key="item" class="idleItemBox">
      <ul>
        <li>详情：{{ item.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        itemList: []
      }
    },
    onLoad () {
      this.$fly.get('https://www.wjxweb.cn:789/setAsideGoods/all/1').then(res => {
        console.log('kkkkk')
        this.itemList = res.data.data
      }).catch(err => {
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
  .idleItemBox{
    border:3px solid black;
    margin-left: 20rpx;
    margin-right: 20rpx;
    margin-bottom: 20rpx;
    border-radius: 20px;
    text-align: center
  }
</style>
