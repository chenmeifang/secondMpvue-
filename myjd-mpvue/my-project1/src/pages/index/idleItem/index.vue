<template>
  <div class="twoHandsBook">
    <p class="title">闲置物转出</p>
    <p>_________________________________________________________________</p>
    <ul v-for="item in itemList" :key="item">
      <li>闲置物详情：{{ item.name }}</li>
    <p>__________________________________________________________________</p>
    </ul>
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
    /* font-size: 30px; */
  }
</style>
