<template>
  <div class="travel">
    <p class="title">旅游</p>
    <div v-for="item in travelList" :key="item" class="TravelBox">
      <ul>
        <li>旅游地：{{ item.place }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        travelList: []
      }
    },
    onLoad () {
      this.$fly.get('https://www.wjxweb.cn:789/Travel/all/1')
        .then(res => {
          this.travelList = res.data.data
          console.log(res)
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
  .travelBox{
    border-left: 2px solid cornflowerblue;
    border-right: 2px solid cornflowerblue;
    border-top: 2px solid cornflowerblue;
    margin-left: 2rpx;
    margin-right: 2rpx;
    margin-bottom: 2rpx
  }
</style>
