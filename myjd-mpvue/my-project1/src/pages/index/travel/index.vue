<template>
  <div class="travel">
    <p class="title">旅游</p>
    <div v-for="item in travelList" :key="item" class="travelBox">
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
  border:3px solid black;
  margin-left: 20rpx;
  margin-right: 20rpx;
  margin-bottom: 20rpx;
  border-radius: 20px;
  text-align: center
  }
</style>
