<template>
  <div class="twoHandsBook">
    <p class="title">二手书</p>
    <scroll-view
    :style="{'height': '550px'}"
    :scroll-y="true"
    @scrolltolower="scrolltolower">
    <div v-for="item in usedBookList" :key="item" class="usedBookBox">
      <ul>
        <li>书名：{{ item.bookName }}</li>
        <li>书价：{{ item.bookPrice }}</li>
      </ul>
      <button @click="toPublisher(item)">处理(联系发布人)</button>
    </div>
    </scroll-view>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        pages: 1,
        usedBookList: [],
        saleTo: 0,
        nickname1: '',
        nickname2: '',
        avatar1: '',
        avatar2: ''
      }
    },
    onReady () {
      this.$fly.get(`https://www.wjxweb.cn:789/TwoHandsBook/all/${this.pages}`)
        .then(res => {
          console.log(res)
          this.usedBookList = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
      this.$fly.get(`https://www.wjxweb.cn:789/User/all/1?type=wxOpen&value=${this.$store.state.openId}`)
        .then(res => {
          console.log(res)
          this.saleTo = res.data.data[0].id
          this.nickname1 = res.data.data[0].nickName
          this.avatar1 = res.data.data[0].avatar
        })
        .catch(err => {
          console.log(err)
        })
    },
    methods: {
      scrolltolower () {
        this.$fly.get(`https://www.wjxweb.cn:789/TwoHandsBook/all/${this.pages}`)
          .then(res => {
            this.usedBookList = this.usedBookList.concat(res.data.data)
            if (res.data.data.length < 20) {
              this.pages = null
            } else {
              this.pages++
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      toPublisher (item) {
        this.$fly.put('https://www.wjxweb.cn:789/TwoHandsBook', {
          belongTo: item.belongTo,
          bookName: item.bookName,
          bookPrice: item.bookPrice,
          date: item.date,
          id: item.id,
          imgurl: item.imgurl,
          isSaled: true,
          saleTo: this.saleTo
        })
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
        this.$fly.post('https://www.wjxweb.cn:789/Contact', {
          id: 0,
          fromWho: item.belongTo,
          toWho: this.saleTo,
          nickname: this.nickname1,
          avatar: this.avatar1
        })
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
        this.$fly.get(`https://www.wjxweb.cn:789/User/all/1?type=id&value=${item.belongTo}`)
          .then(res => {
            this.nickname2 = res.data.data[0].nickName
            this.avatar2 = res.data.data[0].avatar
            console.log(res)
            console.log(this.nickname2)
            console.log(this.avatar2)
            this.$fly.post('https://www.wjxweb.cn:789/Contact', {
              id: 0,
              fromWho: this.saleTo,
              toWho: item.belongTo,
              nickname: this.nickname2,
              avatar: this.avatar2
            })
              .then(res => {
                console.log(res)
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
.title {
    text-align: center;
    margin-bottom: 50rpx
  }
li{
    margin: 20rpx
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
