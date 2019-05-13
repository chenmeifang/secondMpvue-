<template>
  <div class="twoHandsBook">
    <p class="title">二手书</p>
    <scroll-view
    :style="{'height': '550px'}"
    :scroll-y="true"
    @scrolltolower="scrolltolower">
    <div v-for="item in usedBookList" :key="item" class="usedBookBox">
      <div class="avatarDiv"><img :src="item.userAva" class="avatar"/></div>
      <img :src="item.imgUrl" class="detailImg" @click="preview(item)"/>
      <div class="one">书名：{{  item.bookName  }}</div>
      <div class="two">书价：{{  item.bookPrice  }}</div>
      <button @click="toPublisher(item)" class="btn">pick此书(联系卖主)</button>
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
        avatar2: '',
        is: false,
        count: 0
      }
    },
    onLoad () {
      this.showData()
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
      showData () {
        this.pages = 1
        this.$fly.get(`https://www.wjxweb.cn:789/TwoHandsBook/all/${this.pages}`)
          .then(res => {
            console.log(res)
            this.usedBookList = res.data.data
            this.count = res.data.count / 20
          })
          .catch(err => {
            console.log(err)
          })
      },
      scrolltolower () {
        if (this.count > this.pages) {
          this.pages++
          this.$fly.get(`https://www.wjxweb.cn:789/TwoHandsBook/all/${this.pages}`)
            .then(res => {
              this.usedBookList = this.usedBookList.concat(res.data.data)
            })
            .catch(err => {
              console.log(err)
            })
        }
      },
      toPublisher (item) {
        this.$fly.put('https://www.wjxweb.cn:789/TwoHandsBook', {
          belongTo: item.belongTo,
          bookName: item.bookName,
          bookPrice: item.bookPrice,
          date: item.date,
          id: item.id,
          imgUrl: item.imgUrl,
          isSaled: true,
          saleTo: this.saleTo,
          userAva: item.userAva
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
          })
          .catch(err => {
            console.log(err)
          })
        this.$fly.get(`https://www.wjxweb.cn:789/Contact/all/1?type=fromWho&value=${this.saleTo}`)
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
                nickname: this.nickname1,
                avatar: this.avatar1
              })
                .then(res => {
                  console.log(res)
                  this.$fly.post('https://www.wjxweb.cn:789/Contact', {
                    id: 0,
                    fromWho: this.servicedMan,
                    toWho: item.belongTo,
                    nickname: this.nickname2,
                    avatar: this.avatar2
                  })
                    .then(res => {
                      console.log(res)
                      console.log(this.nickname2)
                      console.log(this.avatar2)
                    })
                    .catch(err => {
                      console.log(err)
                    })
                })
                .catch(err => {
                  console.log(err)
                })
            }
            wx.switchTab({
              url: '/pages/conversation/main'
            })
          })
          .catch(err => {
            console.log(err)
          })
      },
      preview (item) {
        wx.previewImage({
          current: item.imgUrl, // 当前显示图片的http链接
          urls: [item.imgUrl] // 需要预览的图片http链接列表
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
.usedBookBox{
  position:relative;
  height: 400rpx;
  border:3px solid black;
  margin-left: 20rpx;
  margin-right: 20rpx;
  margin-bottom: 20rpx;
  border-radius: 20px;
}
.avatarDiv{
  width: 700rpx;
  height: 100rpx;
  background-color:lightgrey;
  border-top-left-radius: 50rpx;
  border-bottom-left-radius: 50rpx;
  border-top-right-radius: 40rpx    
}
.avatar{
  width: 100rpx;
  height: 100rpx;
  border-radius:100rpx;
  }
.detailImg{
    position: absolute;
    width: 300rpx;
    height: 300rpx;
    top: 100rpx;
    border-bottom-left-radius: 30rpx
  }
.one{
    position: absolute;
    width: 380rpx;
    height: 100rpx;
    left:320rpx;
    top:100rpx;
    word-wrap:break-word;
  }
.two{
  position: absolute;
  width: 380rpx;
  height: 100rpx;
  left:320rpx;
  top:170rpx
}
.btn{
    position: absolute;
    top:310rpx;
    width: 350rpx;
    height: 80rpx;
    left: 325rpx;
    padding: 0
  }
</style>
