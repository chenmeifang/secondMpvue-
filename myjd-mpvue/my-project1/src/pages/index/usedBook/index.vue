<template>
  <div class="all">
    <i-notice-bar icon="remind" color="#6495ED" backgroundcolor="#FFFFFF" loop closable>
      点击蓝色图标联系发布人，点击红色图标删除（仅发布该条记录的人删除有效）
    </i-notice-bar>
    <p class="title">二手书</p>
    <scroll-view
      :style="{'height':windowHeight + 'px'}"
      :scroll-y="true"
      @scrolltolower="scrolltolower">
    <div v-for="item in usedBookList" v-show='!item.isSaled' :key="item" class="usedBookBox">
      <div class="topDiv">
        <div class="avatarDiv"><image :src="item.userAva" class="avatar" lazy-load=true></image></div>
        <div class="nicknameDiv">{{ item.belongUsername }}</div>
        <div class="deleteDiv" @click="Delete(item)"></div>
        <div class="acceptDiv" @click="toPublisher(item)"></div>
      </div>
      <div class="bookBoxImg"><img :src="item.imgUrl" class="bookImg" @click="preview(item)"/></div>
      <div class="details">
        <ul>
          <li>书名：{{  item.bookName  }}</li>
          <li>书价：{{  item.bookPrice  }}</li>
          <li>{{ item.date }}</li>
        </ul>
      </div>
    </div>
    </scroll-view>
  </div>
</template>

<script>
  import { formatTime1 } from '../../../utils'
  export default {
    name: 'index',
    data () {
      return {
        pages: 1,
        usedBookList: [],
        saleTo: 0,
        // nickname1: '', /* 接受这条需求的人的Nickname */
        nickname2: '',
        // avatar1: '',
        avatar2: '',
        is: false,
        count: 0,
        windowHeight: 0
      }
    },
    onLoad () {
      this.showData()
      this.$store.commit('judgeNewUser')
      this.windowHeight = this.$store.state.windowHeight
    },
    methods: {
      showData () {
        this.pages = 1
        this.$fly.get(`https://www.wjxweb.cn:789/TwoHandsBook/all/${this.pages}`)
          .then(res => {
            console.log(res)
            res.data.data.forEach(value => {
              value.date = formatTime1(new Date(value.date))
            })
            this.usedBookList = res.data.data
            this.count = res.data.count / 20
          })
          .catch(err => {
            console.log(err)
          })
      },
      // 滑动到容器底部时触发加载更多数据
      scrolltolower () {
        if (this.count > this.pages) {
          this.pages++
          this.$fly.get(`https://www.wjxweb.cn:789/TwoHandsBook/all/${this.pages}`)
            .then(res => {
              res.data.data.forEach(value => {
                value.date = formatTime1(new Date(value.date))
              })
              this.usedBookList = this.usedBookList.concat(res.data.data)
            })
            .catch(err => {
              console.log(err)
            })
        }
      },
      // 联系发布人
      toPublisher (item) {
        // 这里应该可以不用单独定义saleTo
        this.saleTo = this.$store.state.userInformation.id
        if (this.saleTo.toString() === item.belongTo) {
          wx.showToast({
            icon: 'none',
            title: '无法自己联系自己！！！',
            duration: 2000
          })
        } else {
          this.$fly.get(`https://www.wjxweb.cn:789/Contact/all/1?type=fromWho&value=${this.saleTo}`)
            .then(res => {
              res.data.data.forEach(value => {
                if (value.toWho.toString() === item.belongTo) {
                  this.is = true
                  wx.switchTab({
                    url: '/pages/conversation/main'
                  })
                }
              })
              if (!this.is) {
                this.$fly.post('https://www.wjxweb.cn:789/Contact', {
                  id: 0,
                  fromWho: item.belongTo,
                  toWho: this.saleTo,
                  nickname: this.$store.state.nickname1,
                  avatar: this.$store.state.avatar1,
                  isDisplay: 'true'
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
                      fromWho: this.saleTo,
                      toWho: item.belongTo,
                      nickname: this.nickname2,
                      avatar: this.avatar2,
                      isDisplay: 'true'
                    })
                      .then(res => {
                        console.log(res)
                        wx.switchTab({
                          url: '/pages/conversation/main'
                        })
                      })
                      .catch(err => {
                        console.log(err)
                      })
                  })
                  .catch(err => {
                    console.log(err)
                  })
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      },
      preview (item) {
        wx.previewImage({
          current: item.imgUrl, // 当前显示图片的http链接
          urls: [item.imgUrl] // 需要预览的图片http链接列表
        })
      },
      Delete (item) {
      // 点击删除按钮的人跟发布该需求的人是否匹配
        if (item.belongTo === this.$store.state.userInformation.id.toString()) {
          wx.showModal({
            title: '提示',
            content: '确认删除吗？',
            success: res => {
              if (res.confirm) {
                this.$fly.put('https://www.wjxweb.cn:789/TwoHandsBook', {
                  belongTo: item.belongTo,
                  bookName: item.bookName,
                  bookPrice: item.bookPrice,
                  date: new Date(),
                  id: item.id,
                  imgUrl: item.imgUrl,
                  isSaled: true,
                  saleTo: this.saleTo.toString(),
                  userAva: item.userAva,
                  belongUsername: item.belongUsername
                })
                  .then(res => {
                    console.log(res)
                    this.showData()
                    wx.showToast({
                      title: '删除成功',
                      icon: 'success',
                      duration: 2000
                    })
                  })
                  .catch(err => {
                    console.log(err)
                  })
              } else if (res.cancle) {
              }
            }
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: '不是该记录的发布者，无法进行删除操作！！！',
            duration: 2000
          })
        }
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
.usedBookBox{
  position: relative;
  border-top:1px solid gray;
  margin:0 20rpx 0rpx 20rpx
}
.topDiv{
  position: relative;
  height: 100rpx;
  margin-bottom: 5rpx
}
.avatarDiv{
  float:left;
  height: 90rpx;
  margin:5rpx 31rpx 0 0   
}
.avatar{
  width: 90rpx;
  height: 90rpx;
  border-radius:50%;
  }
.nicknameDiv{
  float: left;
  height:90rpx;
  line-height: 90rpx;
  font-size:30rpx
}
.deleteDiv{
  opacity: 0.6;
  float: right;
  width: 50rpx;
  height: 50rpx;
  background-image: url('../../../../static/images/delete2.png');
  background-size: 50rpx;
  margin: 23rpx 10rpx 0 20rpx
}
.acceptDiv{
  opacity: 0.5;
  float: right;
  width: 60rpx;
  height: 60rpx;
  background-image: url('../../../../static/images/accept1.png');
  background-size: 60rpx;
  margin: 20rpx 20rpx 0 20rpx
}
.bookBoxImg{
  display: inline-block
}
.bookImg{
  width: 250rpx;
  height: 250rpx;
  }
.details{
  float: right;
  margin-right: 20rpx
}
li:nth-child(3){
  float:right;
  font-size: 25rpx;
  margin-top: 95rpx
}
</style>
