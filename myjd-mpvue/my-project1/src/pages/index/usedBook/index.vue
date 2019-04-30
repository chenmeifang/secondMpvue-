<template>
  <div class="twoHandsBook">
    <p class="title">二手书</p>
    <div v-for="item in usedBookList" :key="item" class="usedBookBox">
      <ul>
        <li>书名：{{ item.bookName }}</li>
        <li>书价：{{ item.bookPrice }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        usedBookList: []
      }
    },
    onReady () {
      this.$fly.get('https://www.wjxweb.cn:789/TwoHandsBook/all/1').then(res => {
        console.log(res)
        console.log('二手书')
        this.usedBookList = res.data.data
      })
    }
  }
</script>

<style scoped>
.title {
    text-align: center;
    margin-bottom: 50rpx
  }
.usedBookBox{
  border:3px solid black;
  margin-left: 20rpx;
  margin-right: 20rpx;
  margin-bottom: 20rpx;
  border-radius: 20px;
  text-align: center
}
</style>
