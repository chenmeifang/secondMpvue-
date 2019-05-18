<template>
  <div class="shareBill">
    <i-notice-bar icon="remind" color="#6495ED" backgroundcolor="#FFFFFF" loop closable>
      点击蓝色图标联系发布人，点击红色图标删除（仅发布该条记录的人删除有效）
    </i-notice-bar>
    <p class="title">拼单</p>
    <scroll-view
    :style="{'height': windowHeight + 'px'}"
    :scroll-y="true"
    @scrolltolower="scrolltolower">
    <div v-for="item in shareBillList" v-show='!item.isFind' :key="item" class="shareBillBox">
      <div class="topDiv">
        <div class="avatarDiv"><img :src="item.userAva" class="avatar"/></div>
        <div class="nicknameDiv">{{ item.belongUsername }}</div>
        <div class="deleteDiv"></div>
        <div class="acceptDiv" @click="toPublisher(item)"></div>
      </div>
      <div>详情：{{ item.detail }}</div>
      <div class="publishDateDiv">{{ item.date}}</div>
    </div>
    </scroll-view>
  </div>
</template>

<script>
  import { formatTime } from '../../../utils'
  export default {
    data () {
      return {
        pages: 1,
        shareBillList: [],
        servicedMan: 0,
        nickname1: '',
        nickname2: '',
        avatar1: '',
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
        this.$fly.get(`https://www.wjxweb.cn:789/Demand/all/${this.pages}?type=keywords&value=shareBill`)
          .then(res => {
            console.log(res)
            res.data.data.forEach(value => {
              value.date = formatTime(new Date(value.date))
            })
            this.shareBillList = res.data.data
            this.count = res.data.count / 20
          })
          .catch(err => {
            console.log(err)
          })
      },
      scrolltolower () {
        if (this.count > this.pages) {
          this.pages++
          this.$fly.get(`https://www.wjxweb.cn:789/Demand/all/${this.pages}?type=keywords&value=shareBill`)
            .then(res => {
              res.data.data.forEach(value => {
                value.date = formatTime(new Date(value.date))
              })
              this.shareBillList = this.shareBillList.concat(res.data.data)
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
          date: new Date(),
          id: item.id,
          imgUrl: item.imgUrl,
          isFind: true,
          servicedMan: this.servicedMan,
          userAva: item.userAva,
          belongUsername: item.belongUsername
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
    margin: 10rpx;
    font-size:50rpx
  }
.shareBillBox{
  position: relative;
  border-top:1px solid gray;
  margin:0 20rpx 45rpx 20rpx
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
.publishDateDiv{
  float:right;
  font-size: 25rpx;
  margin-right: 20rpx
}
</style>
