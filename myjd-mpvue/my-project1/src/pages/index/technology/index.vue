<template>
  <div class="technology">
    <p class="title">技术处理</p>
    <scroll-view
    :style="{'height': '550px'}"
    :scroll-y="true"
    @scrolltolower="scrolltolower">
    <div v-for="item in technologyList" :key="item" class="technologyBox">
      <img :src="item.userAva" class="avatar"/>     
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
        avatar2: '',
        is: false,
        count: 0
      }
    },
    onLoad () {
      this.$store.commit('judgeNewUser')
      this.showData()
    },
    methods: {
      showData () {
        this.pages = 1
        this.$fly.get(`https://www.wjxweb.cn:789/Demand/all/${this.pages}?type=keywords&value=technology`)
          .then(res => {
            console.log(res)
            this.technologyList = res.data.data
            this.count = res.data.count / 20
          })
          .catch(err => {
            console.log(err)
          })
      },
      scrolltolower () {
        if (this.count > this.pages) {
          this.pages++
          this.$fly.get(`https://www.wjxweb.cn:789/Demand/all/${this.pages}?type=keywords&value=technology`)
            .then(res => {
              this.technologyList = this.technologyList.concat(res.data.data)
            })
            .catch(err => {
              console.log(err)
            })
        }
      },
      toPublisher (item) {
        this.servicedMan = this.$store.state.userInformation.id
        this.$fly.put('https://www.wjxweb.cn:789/Demand', {
          belongTo: item.belongTo,
          detail: item.detail,
          price: item.price,
          date: item.date,
          id: item.id,
          imgUrl: item.imgUrl,
          isFind: true,
          servicedMan: this.servicedMan,
          userAva: item.userAva
        })
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
        this.$fly.get(`https://www.wjxweb.cn:789/Contact/all/1?type=fromWho&value=${this.servicedMan}`)
          .then(res => {
            res.data.data.forEach(value => {
              if (value.toWho.toString() === item.belongTo) {
                console.log('已存在该联系人')
                this.is = true
              }
            })
            if (!this.is) {
              console.log('不存在此联系人，正在双向创建')
              this.$fly.post('https://www.wjxweb.cn:789/Contact', {
                id: 0,
                fromWho: item.belongTo,
                toWho: this.servicedMan,
                nickname: this.$store.state.nickname1,
                avatar: this.$store.state.avatar1
              })
                .then(res => {
                  console.log(res)
                })
                .catch(err => {
                  console.log(err)
                })
              this.$fly.get(`https://www.wjxweb.cn:789/User/all/1?type=id&value=${item.belongTo}`)
                .then(res => {
                  console.log(res)
                  this.nickname2 = res.data.data[0].nickName
                  this.avatar2 = res.data.data[0].avatar
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
                  wx.switchTab({
                    url: '/pages/conversation/main'
                  })
                })
                .catch(err => {
                  console.log(err)
                })
            }
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
  .avatar{
  width: 100rpx;
  height: 100rpx;
  border-radius:100rpx;
  float:left
  }
  li{
    word-wrap:break-word;
    margin: 20rpx 20rpx 20rpx 120rpx
  }
  .technologyBox{
    border:3px solid black;
    margin: 0 20rpx 20rpx 20rpx;
    border-radius: 20px;
  }
</style>
