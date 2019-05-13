<template>
  <div class="idleItem">
    <p class="title">闲置物转出</p>
    <!-- <scroll-view
    scroll-y
    style="height: 400px;"
    @bindscrolltolower="scrolltolower"> -->
    <scroll-view
    :style="{'height': '550px'}"
    :scroll-y="true"
    @scrolltolower="scrolltolower">
      <div v-for="(item, index) in itemList" :key="index" class="idleItemBox">
        <div class="avatarDiv"><img :src="item.userAva" class="avatar"/></div>
        <img :src="item.imgUrl" class="detailImg" @click="preview(item)"/>
        <div class="one">详情：{{  item.name  }}</div>
        <div class="two">价格：{{  item.price  }}</div>
        <button @click="toPublisher(item)" class="btn">收入囊中(联系卖主)</button>
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
        itemList: [],
        saleTo: 0,
        nickname1: '', /* 接受这条需求的人的Nickname */
        nickname2: '', /* 发布这条需求的人的Nickname */
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
          /* 拿到接受需求的人的openid，点击按钮的时候，就调用put修改saleTo为此人openId的对应User表里面的id */
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
        this.$fly.get(`https://www.wjxweb.cn:789/setAsideGoods/all/${this.pages}`)
          .then(res => {
            console.log(res)
            this.itemList = res.data.data
            this.count = res.data.count / 20
            // this.pages++
          })
          .catch(err => {
            console.log(err)
          })
      },
      /* scrolltolower () {
        if (this.itemList.length < 20) {
          this.pages = null
        }
        this.$fly.get(`https://www.wjxweb.cn:789/setAsideGoods/all/${this.pages}`)
          .then(res => {
            this.itemList = this.itemList.concat(res.data.data)
            if (res.data.data.length < 20) {
              // 如果请求的那一页的数据没有20个，pages就不再自增了
              // 设置pages为 null，这样就请求不到数据了，只是服务器会报错
              // 这个地方应该还可以改进
              this.pages = null
            } else {
              this.pages++
            }
          })
          .catch(err => {
            console.log(err)
          })
      }, */
      // 改进后
      scrolltolower () {
        if (this.count > this.pages) {
          this.pages++
          this.$fly.get(`https://www.wjxweb.cn:789/setAsideGoods/all/${this.pages}`)
            .then(res => {
              this.itemList = this.itemList.concat(res.data.data)
            })
            .catch(err => {
              console.log(err)
            })
        }
      },
      /* 点击收入囊中（联系卖主）的按钮时，要用this.$fly.put修改需求表中的对应的需求的saleTo和isSaled属性 */
      toPublisher (item) {
        this.$fly.put('https://www.wjxweb.cn:789/setAsideGoods', {
          belongTo: item.belongTo,
          date: item.date,
          id: item.id,
          imgUrl: item.imgUrl,
          isSaled: false,
          name: item.name,
          price: item.price,
          saleTo: this.saleTo,
          userAva: item.userAva
        })
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
        this.$fly.get(`https://www.wjxweb.cn:789/Contact/all/1?type=fromWho&value=${this.saleTo}`)
          .then(res => {
            res.data.data.forEach(value => {
              /* console.log(value.toWho)
              console.log(item.belongTo) */
              // 这里toWho和belongTo数据类型不一致  toWho是int型，belongTo是string型
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
                  this.$fly.post('https://www.wjxweb.cn:789/Contact', {
                    id: 0,
                    fromWho: this.saleTo,
                    toWho: item.belongTo,
                    // 这里的nickname和avatar是发布这条需求的人的nickname和avatar
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
  .avatar{
  width: 100rpx;
  height: 100rpx;
  border-radius:100rpx;
  }
  .avatarDiv{
    width: 700rpx;
    height: 100rpx;
    background-color:lightgrey;
    border-top-left-radius: 50rpx;
    border-bottom-left-radius: 50rpx;
    border-top-right-radius: 40rpx    
  }
  .detailImg{
    position: absolute;
    width: 300rpx;
    height: 300rpx;
    top: 100rpx
  }
  .one{
    position: absolute;
    width: 380rpx;
    height: 200rpx;
    left:320rpx;
    top:100rpx;
    word-wrap:break-word;
  }
  .two{
    position: absolute;
    width: 380rpx;
    height: 100rpx;
    left:320rpx;
    top:340rpx
  }
  .idleItemBox{
    height: 500rpx;
    position: relative;
    border: 3px solid black;
    margin: 0 20rpx 20rpx 20rpx;
    border-radius: 20px;
  }
  .btn{
    position: absolute;
    top:400rpx;
    width: 698rpx;
  }
</style>
