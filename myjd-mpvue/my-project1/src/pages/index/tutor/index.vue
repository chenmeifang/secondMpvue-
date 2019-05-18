<template>
    <div class="all">
      <i-notice-bar icon="remind" color="#6495ED" backgroundcolor="#FFFFFF" loop closable>
      点击蓝色图标联系发布人，点击红色图标删除（仅发布该条记录的人删除有效）
      </i-notice-bar>
      <p class="title">家教</p>
      <scroll-view
        :style="{'height': windowHeight + 'px'}"
        :scroll-y="true"
        @scrolltolower="scrolltolower">
        <div v-for="item in tutorList" v-show='!item.isFind' :key="item" class="tutorBox">
          <div class="topDiv">
            <div class="avatarDiv"><img :src="item.userAva" class="avatar"/></div>
            <div class="nicknameDiv">腾飞</div>
            <div class="deleteDiv"></div>
            <div class="acceptDiv" @click="toPublisher(item)"></div>
          </div>
          <ul>
            <li>详情：{{ item.detail }}</li>
            <li>地点：{{ item.workPlace}}</li>
            <li>报酬：{{ item.salary }}</li>
            <li>{{ item.date }}</li>
          </ul>
          </div>
        </scroll-view>
    </div>
</template>
<script>
import { formatTime } from '../../../utils'
export default {
  data () {
    return {
      tutorList: [],
      pages: 1,
      count: 0,
      belongTo: 0,
      windowHeight: 0,
      windowWidth: 0
    }
  },
  onLoad () {
    this.showData()
    this.$store.commit('judgeNewUser')
    this.windowHeight = this.$store.state.windowHeight
    this.windowWidth = this.$store.state.windowWidth
  },
  onShow () {
  },
  methods: {
    showData () {
      this.pages = 1
      this.$fly.get(`https://www.wjxweb.cn:789/Tutor/all/${this.pages}`)
        .then(res => {
          console.log(res)
          res.data.data.forEach(value => {
            value.date = formatTime(new Date(value.date))
          })
          this.tutorList = res.data.data
          this.count = res.data.count / 20
        })
        .catch(err => {
          console.log(err)
        })
    },
    scrolltolower () {
      if (this.count > this.pages) {
        this.pages++
        this.$fly.get(`https://www.wjxweb.cn:789/Tutor/all/${this.pages}`)
          .then(res => {
            res.data.data.forEach(value => {
              value.date = formatTime(new Date(value.date))
            })
            this.tutorList = this.tutorList.concat(res.data.data)
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    toPublisher (item) {
      this.serviceMan = this.$store.state.userInformation.id
      this.$fly.put('https://www.wjxweb.cn:789/Tutor', {
        date: new Date(),
        detail: item.detail,
        id: item.id,
        isFind: true,
        salary: item.salary,
        userAva: item.userAva,
        workPlace: item.workPlace,
        serviceMan: this.serviceMan,
        belongUsername: this.belongUsername
      })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
      this.$fly.get(`https://www.wjxweb.cn:789/User/all/1?type=avatar&value=${item.userAva}`)
        .then(res => {
          console.log(res)
          this.belongTo = res.data.data[0].id
          this.$fly.get(`https://www.wjxweb.cn:789/Contact/all/1?type=fromWho&value=${this.serviceMan}`)
            .then(res => {
              res.data.data.forEach(value => {
                if (value.toWho === this.belongTo) {
                  console.log('已存在该联系人')
                  this.is = true
                }
              })
              if (!this.is) {
                console.log('不存在此联系人，正在双向创建')
                this.$fly.post('https://www.wjxweb.cn:789/Contact', {
                  id: 0,
                  fromWho: this.belongTo,
                  toWho: this.serviceMan,
                  nickname: this.$store.state.nickname1,
                  avatar: this.$store.state.avatar1
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
                      fromWho: this.serviceMan,
                      toWho: this.belongTo,
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
  opacity: 0.6;
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
li:nth-child(3){
  display: inline;
}
li:nth-child(4){
  display: inline-block;
  float: right;
  font-size: 26rpx;
  padding:15rpx
}
li{
  margin: 0 0 5rpx 9rpx;
  }
.tutorBox{
  border-top: 1px solid gray;
  margin:0 20rpx 10rpx 20rpx;
}
</style>


