<template>
  <div class="all">
    <i-notice-bar icon="remind" color="#6495ED" backgroundcolor="#FFFFFF" loop closable>
      点击蓝色图标联系发布人，点击红色图标删除（仅发布该条记录的人删除有效）
    </i-notice-bar>
    <p class="title">租房及转租</p>
    <scroll-view
    :style="{'height': windowHeight + 'px'}"
    :scroll-y="true"
    @scrolltolower="scrolltolower">
        <div v-for="item in rentList" :key="item" v-show="!item.isFind" class="rentBox">
          <div class="topDiv">
              <div class="avatarDiv"><img :src="item.userAva" class="avatar"/></div>
              <div class="nicknameDiv"><!-- 先不填 --></div>
              <div class="deleteDiv" @click="Delete(item)"></div>
              <div class="acceptDiv" @click="toPublisher(item)"></div>
            </div>
            <ul>
              <li>内部配置：{{ item.detail }}</li>
              <li>大概位置：{{ item.place }}</li>
              <li>房租：{{ item.price }}</li>
              <!-- <li>{{ item.date }}</li> -->
            </ul>
            <div class="bigdate">
              <div class="date">{{ item.date }}</div>
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
        rentList: [],
        pages: 1,
        belongTo: 0,
        roomMate: 0,
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
        this.$fly.get(`https://www.wjxweb.cn:789/Renting/all/${this.pages}`)
          .then(res => {
            console.log(res)
            res.data.data.forEach(value => {
              value.date = formatTime1(new Date(value.date))
            })
            this.rentList = res.data.data
            this.count = res.data.count / 20
          })
          .catch(err => {
            console.log(err)
          })
      },
      scrolltolower () {
        if (this.count > this.pages) {
          this.pages++
          this.$fly.get(`https://www.wjxweb.cn:789/Renting/all/${this.pages}`)
            .then(res => {
              res.data.data.forEach(value => {
                value.date = formatTime1(new Date(value.date))
              })
              this.rentList = this.rentList.concat(res.data.data)
            })
            .catch(err => {
              console.log(err)
            })
        }
      },
      toPublisher (item) {
        // this.roomMate相当于其他需求的servicedMan
        this.roomMate = this.$store.state.userInformation.id
        this.$fly.get(`https://www.wjxweb.cn:789/User/all/1?type=avatar&value=${item.userAva}`)
          .then(res => {
            console.log(res)
            this.belongTo = res.data.data[0].id
            if (this.roomMate === this.belongTo) {
              wx.showToast({
                icon: 'none',
                title: '无法自己联系自己！！！',
                duration: 2000
              })
            } else {
              this.$fly.get(`https://www.wjxweb.cn:789/Contact/all/1?type=fromWho&value=${this.roomMate}`)
                .then(res => {
                  res.data.data.forEach(value => {
                    if (value.toWho === this.belongTo) {
                      console.log('已存在该联系人')
                      this.is = true
                      this.$fly.put('https://www.wjxweb.cn:789/Contact', {
                        id: value.id,
                        fromWho: value.fromWho,
                        toWho: value.toWho,
                        nickname: value.nickname,
                        avatar: value.avatar,
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
                    }
                  })
                  if (!this.is) {
                    console.log('不存在此联系人，正在双向创建')
                    this.$fly.post('https://www.wjxweb.cn:789/Contact', {
                      id: 0,
                      fromWho: this.belongTo,
                      toWho: this.roomMate,
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
                    this.$fly.get(`https://www.wjxweb.cn:789/User/all/1?type=id&value=${this.belongTo}`)
                      .then(res => {
                        this.nickname2 = res.data.data[0].nickName
                        this.avatar2 = res.data.data[0].avatar
                        console.log(res)
                        this.$fly.post('https://www.wjxweb.cn:789/Contact', {
                          id: 0,
                          fromWho: this.roomMate,
                          toWho: this.belongTo,
                          // 这里的nickname和avatar是发布这条需求的人的nickname和avatar
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
          })
          .catch(err => {
            console.log(err)
          })
      },
      Delete (item) {
      // 点击删除按钮的人跟发布该需求的人是否匹配
      // 租房表也没有item.belongTo
        this.$fly.get(`https://www.wjxweb.cn:789/User/all/1?type=avatar&value=${item.userAva}`)
          .then(res => {
            console.log(res)
            this.belongTo = res.data.data[0].id
            if (this.belongTo === this.$store.state.userInformation.id) {
              // 把租房先做成一对一吧降低难度
              wx.showModal({
                title: '提示',
                content: '确认删除吗？',
                success: res => {
                  if (res.confirm) {
                    this.$fly.put('https://www.wjxweb.cn:789/Renting', {
                      alreadyNum: 0,
                      date: new Date(),
                      detail: item.detail,
                      id: item.id,
                      isFind: true,
                      place: item.place,
                      price: item.price,
                      userAva: item.userAva,
                      roomMateNum: 0,
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
.topDiv{
  height: 100rpx;
  position: relative
}
.avatar{
  width: 90rpx;
  height: 90rpx;
  border-radius: 50%;
}
.avatarDiv{
  float: left;
  margin: 5rpx 31rpx -10rpx 0
}
.nicknameDiv{
  float: left;
  height:100rpx;
  line-height: 100rpx;
  font-size:30rpx
}
.deleteDiv{
  opacity: 1;
  float: right;
  width: 50rpx;
  height: 50rpx;
  background-image: url('../../../../static/images/delete2.png');
  background-size: 50rpx;
  margin: 23rpx 10rpx 20rpx 20rpx
}
.acceptDiv{
  opacity: 0.5;
  float: right;
  width: 60rpx;
  height: 60rpx;
  background-image: url('../../../../static/images/accept1.png');
  background-size: 60rpx;
  margin: 20rpx
}
.bigdate{
  position:relative;
  height: 15px;
}
.date{
  font-size: 26rpx;
  float: right;
  margin-right: 5px
}
li{
  margin: 0 0 5rpx 9rpx;
  }
.rentBox{
  border-top: 1px solid gray;
  margin:0 20rpx 10rpx 20rpx;
}
</style>
