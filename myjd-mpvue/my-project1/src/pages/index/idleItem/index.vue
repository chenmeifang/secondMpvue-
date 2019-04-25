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
    onShow () {
      this.$fly.get('https://www.wjxweb.cn:789/setAsideGoods/all/1').then(res => {
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
    border-left: 2px solid cornflowerblue;
    border-right: 2px solid cornflowerblue;
    border-top: 2px solid cornflowerblue;
    margin-left: 2rpx;
    margin-right: 2rpx;
    margin-bottom: 2rpx
  }
</style>
