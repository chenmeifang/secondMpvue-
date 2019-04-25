<template>
  <div class="twoHandsBook">
    <p class="title">其他</p>
    <ul v-for="item in demandList" :key="item">
      <li>详情：{{ item.detail }}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        demandList: []
      }
    },
    onLoad () {
      this.$fly.get('https://www.wjxweb.cn:789/Demand/all/1?type=keywords&value=其他')
        .then(res => {
          console.log(res)
          this.demandList = res.data.data
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
    /* font-size: 30px; */
  }
</style>
