<template>
  <div class="all">
      <p class="title">发布记录</p>
        <div v-for="item in idleItemlist" :key="item" class="myReleaseBox">
          <ul>
            <li>详情：{{ item.name }}</li>
          </ul>
        </div>
        <div v-for="item in usedBookList" :key="item" class="myReleaseBox">
          <ul>
            <li>书名：{{ item.bookName }}</li>
            <li>书价：{{ item.bookPrice }}</li>           
          </ul>
        </div>
        <div v-for="item in DemandList" :key="item" class="myReleaseBox">
          <ul>
            <li>详情：{{ item.detail }}</li>
          </ul>
        </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        belongTo: 0,
        usedBookList: [],
        idleItemlist: [],
        DemandList: []
      }
    },
    onLoad () {
      this.showPublished()
      // 没有按时间排序 这个功能可以后面补上
    },
    methods: {
      showPublished () {
        this.$fly.get(`https://www.wjxweb.cn:789/User/all/1?type=wxOpen&value=${this.$store.state.openId}`)
          .then(res => {
            console.log(res)
            this.belongTo = res.data.data[0].id
            this.$fly.get(`https://www.wjxweb.cn:789/Demand/all/1?type=belongTo&value=${this.belongTo}`)
              .then(res => {
                console.log(res)
                this.DemandList = res.data.data
              })
              .catch(err => {
                console.log(err)
              })
            this.$fly.get(`https://www.wjxweb.cn:789/TwoHandsBook/all/1?type=belongTo&value=${this.belongTo}`)
              .then(res => {
                console.log(res)
                this.usedBookList = res.data.data
              })
              .catch(err => {
                console.log(err)
              })
            this.$fly.get(`https://www.wjxweb.cn:789/setAsideGoods/all/1?type=belongTo&value=${this.belongTo}`)
              .then(res => {
                console.log(res)
                this.idleItemlist = res.data.data
              })
              .catch(err => {
                console.log(err)
              })
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
</script>

<style scoped>
.all{
  background-color: #f8f8f9;
}
.title {
    text-align: center;
    margin: 10rpx;
    font-size:50rpx
}
li{
  margin: 20rpx
}
.myReleaseBox{
  border:3px solid #e9eaec;
  margin: 0 20rpx 20rpx 20rpx;
  border-radius: 10px;
}
</style>
