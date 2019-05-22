<template>
  <div class="all">
    <i-notice-bar icon="remind" color="#6495ED" backgroundcolor="#FFFFFF" loop closable>
      点击蓝色图标联系发布人，点击红色图标删除（仅发布该条记录的人删除有效）
    </i-notice-bar>
    <p class="title">兼职</p>
    <scroll-view
    :style="{'height': windowHeight + 'px'}"
    :scroll-y="true"
    @scrolltolower="scrolltolower">
    <div v-for="item in partTimeJobList" :key="item" v-show="!item.isFind" class="partTimeJobBox">
      <div class="topDiv">
              <div class="avatarDiv"><img :src="item.userAva" class="avatar"/></div>
              <div class="nicknameDiv">腾飞</div>
              <div class="deleteDiv" @click="Delete(item)"></div>
              <div class="acceptDiv" @click="toPublisher(item)"></div>
      </div>
      <ul>
        <li>工作细节：{{ item.detail }}</li>
        <li>工作地点：{{ item.workplace }}</li>
        <li>工作报酬：{{ item.salary }}</li>
        <li>需要人数：{{ item.needNum }}</li>
        <li>{{ item.date }}</li>
      </ul>
    </div>
    </scroll-view>
  </div>
</template>

<script>
  import { formatTime1 } from '../../../utils'
  export default {
    data () {
      return {
        partTimeJobList: [],
        count: 0,
        serverMan: 0, /* 点击接受按钮的人对应的id */
        belongTo: 0,
        alreadyNum: 0,
        pages: 1,
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
        this.$fly.get(`https://www.wjxweb.cn:789/PartTimeJob/all/${this.pages}`)
          .then(res => {
            console.log(res)
            res.data.data.forEach(value => {
              value.date = formatTime1(new Date(value.date))
            })
            this.partTimeJobList = res.data.data
            this.count = res.data.count / 20
          })
          .catch(err => {
            console.log(err)
          })
      },
      scrolltolower () {
        if (this.count > this.pages) {
          this.pages++
          this.$fly.get(`https://www.wjxweb.cn:789/PartTimeJob/all/${this.pages}`)
            .then(res => {
              // 将时间转换为标准格式
              res.data.data.forEach(value => {
                value.date = formatTime1(new Date(value.date))
              })
              this.partTimeJobList = this.partTimeJobList.concat(res.data.data)
            })
            .catch(err => {
              console.log(err)
            })
        }
      },
      toPublisher (item) {
        this.serverMan = this.$store.state.userInformation.id
        // post这条记录主要是为了拿到serverMan
        this.$fly.post('https://www.wjxweb.cn:789/PartTimeJobHelper', {
          id: 0,
          jobNum: item.id,
          // 这里的jobNum是兼职对应的编号
          serverMan: this.serverMan
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
            this.$fly.get(`https://www.wjxweb.cn:789/Contact/all/1?type=fromWho&value=${this.serverMan}`)
              .then(res => {
                res.data.data.forEach(value => {
                  if (value.toWho === this.belongTo) {
                    console.log('已存在该联系人')
                    this.is = true
                    wx.switchTab({
                      url: '/pages/conversation/main'
                    })
                  }
                })
                if (!this.is) {
                  console.log('不存在此联系人，正在双向创建')
                  this.$fly.post('https://www.wjxweb.cn:789/Contact', {
                    id: 0,
                    fromWho: this.belongTo,
                    toWho: this.serverMan,
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
                        fromWho: this.serverMan,
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
              })
              .catch(err => {
                console.log(err)
              })
          })
          .catch(err => {
            console.log(err)
          })
        wx.switchTab({
          url: '/pages/conversation/main'
        })
      },
      Delete (item) {
        this.$fly.get(`https://www.wjxweb.cn:789/User/all/1?type=avatar&value=${item.userAva}`)
          .then(res => {
            console.log(res)
            // partTimeJob表中没有belongTo字段,(即没有item.belongTo),自己定义一个变量belongTo
            this.belongTo = res.data.data[0].id
            if (this.belongTo === this.$store.state.userInformation.id) {
              this.$fly.put('https://www.wjxweb.cn:789/PartTimeJob', {
                detail: item.detail,
                id: item.id,
                needNum: item.needNum,
                salary: item.salary,
                userAva: item.userAva,
                workplace: item.workplace,
                alreadyNum: this.alreadyNum++,
                isFind: true,
                /* 这里把isFind改为true之后，该条记录应该立马就不显示了
                   但实际上只能在下次进入到这个页面时才不显示该条记录
                   若要想它立马不显示，可以重新渲染一遍数据，但问题是若当前记录是第2页数据，重新渲染的时候会跳回第一页数据，不太好 */
                // 怎么让他重新渲染的时候直接显示当前页数据 后面再完善
                date: new Date()
              })
                .then(res => {
                  console.log(res)
                  // 重新渲染数据
                  this.showData()
                  wx.showToast({
                    title: '删除成功！！！',
                    icon: 'success',
                    duration: 2000
                  })
                })
                .catch(err => {
                  console.log(err)
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
li:nth-child(4){
  display: inline;
}
li:nth-child(5){
  display: inline-block;
  float: right;
  font-size: 26rpx;
  padding:15rpx
}
li{
  margin: 0 0 5rpx 9rpx;
  }
.partTimeJobBox{
  border-top: 1px solid gray;
  margin:0 20rpx 10rpx 20rpx;
}
</style>

