<template>
  <div class="travel">
    <p class="title">旅游</p>
    <scroll-view
    :style="{'height': '550px'}"
    :scroll-y="true"
    @scrolltolower="scrolltolower">
    <div v-for="item in travelList" :key="item" class="travelBox">
      <ul>
        <li>旅游地：{{ item.place }}</li>
      </ul>
      <button @click="toPublisher(item)">处理(联系发布人)</button>
    </div>
    </scroll-view>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        pages: 1,
        travelList: []
      }
    },
    onLoad () {
      this.$fly.get(`https://www.wjxweb.cn:789/Travel/all/${this.pages}`)
        .then(res => {
          this.travelList = res.data.data
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    methods: {
      toPublisher (item) {
      }
    }
  }
</script>

<style scoped>
 .title {
    text-align: center;
    margin-bottom: 50rpx
  }
  li{
    margin: 20rpx
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
