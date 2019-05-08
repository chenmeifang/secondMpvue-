<template>
  <div class="technology">
    <p class="title">技术处理</p>
    <scroll-view
    :style="{'height': '550px'}"
    :scroll-y="true"
    @scrolltolower="scrolltolower">
    <div v-for="item in technologyList" :key="item" class="technologyBox">
      <ul>
        <li>详情：{{ item.detail }}</li>
        <li>报酬：{{ item.price }}</li>
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
        technologyList: [],
        servicedMan: 0,
        nickname1: '',
        nickname2: '',
        avatar1: '',
        avatar2: ''
      }
    },
    onLoad () {
      this.$fly.get(`https://www.wjxweb.cn:789/Demand/all/${this.pages}?type=keywords&value=technology`)
        .then(res => {
          console.log(res)
          this.technologyList = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
      this.$fly.get(`https://www.wjxweb.cn:789/User/all/1?type=wxOpen&value=${this.$store.state.openId}`)
        .then(res => {
          console.log(res)
          this.servicedMan = res.data.data[0].id
          this.nickname1 = res.data.data[0].nickName
          this.avatar1 = res.data.data[0].avatar
        })
        .catch(err => {
          console.log(err)
        })
    },
    methods: {
      scrolltolower () {
        this.$fly.get(`https://www.wjxweb.cn:789/Demand/all/${this.pages}?type=keywords&value=technology`)
          .then(res => {
            this.technologyList = this.technologyList.concat(res.data.data)
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
        this.$fly.put('https://www.wjxweb.cn:789/Demand', {
          id: item.id,
          belongTo: item.belongTo,
          detail: item.detail,
          price: item.price,
          isFind: true,
          keywords: item.keywords,
          servicedMan: this.servicedMan,
          date: item.date
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
          toWho: this.servicedMan,
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
              fromWho: this.servicedMan,
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
  .technologyBox{
    border:3px solid black;
    margin: 0 20rpx 20rpx 20rpx;
    border-radius: 20px;
  }
</style>
