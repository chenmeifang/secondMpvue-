<template>
  <div class="twoHandsBook">
    <p class="title">二手书</p>
    <p>________________________________________________________________</p>
    <ul v-for="item in usedBookList" :key="item">
      <li>书名：{{ item.bookName }}</li>
      <li>书价：{{ item.bookPrice }}</li>
      <p>________________________________________________________________</p>
    </ul>
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
    /* font-size: 30px; */
  }
</style>
