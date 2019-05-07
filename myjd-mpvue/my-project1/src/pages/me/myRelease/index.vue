<template>
  <div class="whole">
      <h2>发布的单子</h2>
        <div v-for="item in usedBookList" :key="item" class="myReleaseBox">
          <ul>
            <li>书名：{{ item.bookName }}</li>
            <li>书价：{{ item.bookPrice }}</li>           
          </ul>
        </div>
        <div v-for="item in itemList" :key="item" class="myReleaseBox">
          <ul>
            <li>详情：{{ item.name }}</li>
          </ul>
        </div>
        <div v-for="item in travelList" :key="item" class="myReleaseBox">
          <ul>
            <li>旅游地：{{ item.place }}</li>
          </ul>
        </div>
        <div v-for="item in myReleaseList" :key="item" class="myReleaseBox">
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
        itemList: [],
        travelList: [],
        myReleaseList: []
      }
    },
    methods: {
    },
    onLoad () {
      this.$fly.get(`https://www.wjxweb.cn:789/User/all/1?type=wxOpen&value=${this.$store.state.openId}`)
        .then(res => {
          console.log(res)
          this.belongTo = res.data.data[0].id
          console.log(res.data.data[0].id)
        })
        .catch(err => {
          console.log(err)
        })
    },
    onReady () {
      this.$fly.get(`https://www.wjxweb.cn:789/Demand/all/1?type=belongTo&value=${this.belongTo}`)
        .then(res => {
          console.log(res)
          this.myReleaseList = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
      this.$fly.get(`https://www.wjxweb.cn:789/setAsideGoods/all/1?type=belongTo&value=${this.belongTo}`)
        .then(res => {
          console.log(res)
          this.itemList = res.data.data
          console.log(this.itemList)
        })
        .catch(err => {
          console.log(err)
        })
      this.$fly.get(`https://www.wjxweb.cn:789/Travel/all/1?type=belongTo&value=${this.belongTo}`)
        .then(res => {
          console.log(res)
          this.travelList = res.data.data
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
    }
  }
</script>

<style scoped>
  h2{
    text-align: center
  }
  /* .body {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom right, #fc9c8d, #c5d2ff);
  } */
  li{
    margin: 20rpx
  }
  .myReleaseBox{
  border:3px solid black;
  margin: 0 20rpx 20rpx 20rpx;
  border-radius: 20px;
}
</style>
