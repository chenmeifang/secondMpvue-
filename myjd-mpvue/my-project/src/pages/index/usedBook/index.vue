<template>
  <div class="twoHandsBook">
    <p class="title">二手书</p>
      <div v-for="item in usedBookList" :key="item" class="usedBookBox">
        <div class="left">
          <ul>
            <li>书名：{{ item.bookName }}</li>
            <li>书价：{{ item.bookPrice}}</li>
          </ul>
        </div>
        <div class="pattern">
        </div>
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
    created () {
      this.$fly.get('https://www.wjxweb.cn:789/TwoHandsBook/all/1').then((res) => {
        this.usedBookList = res.data.data
      })
    }
  }
</script>

<style scoped>
  .title {
    text-align: center;
  }
</style>