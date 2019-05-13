<template>
  <div class="twoHandsBook">
    <p class="title">竞赛组队</p>
    <scroll-view
    :style="{'height': '550px'}"
    :scroll-y="true"
    @scrolltolower="scrolltolower">
    <div v-for="(item,index) in competitionList" :key="index" class="competitionBox">
      <!-- <img src="item.userAva"/> 这个不行-->
      <!-- <img :src={{  item.userAva  }}/>  这个不行 -->
      <img :src="item.userAva" class="avatar"/>
      <ul>
        <li>详情：{{ item.detail }}</li>
      </ul>
      <button @click="toPublisher(item)">组队(联系发起人)</button>
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
        competitionList: [],
        servicedMan: 0,
        nickname1: '',
        nickname2: '',
        avatar1: '',
        avatar2: '',
        is: false
      }
    },
    created () {
    },
    onReady () {
    },
    onLoad () {
      this.getAccepterInfo()
    },
    onShow () {
      this.showData()
    },
    mounted () {
    },
    methods: {
      showData () {
        this.pages = 1
        this.$fly.get(`https://www.wjxweb.cn:789/Demand/all/${this.pages}?type=keywords&value=comp`)
          .then(res => {
            console.log(res)
            this.competitionList = res.data.data
            this.pages++
          })
          .catch(err => {
            console.log(err)
          })
      },
      getAccepterInfo () {
        this.$fly.get(`https://www.wjxweb.cn:789/User/all/1?type=wxOpen&value=${this.$store.state.openId}`)
          .then(res => {
            console.log(res)
            this.servicedMan = res.data.data[0].id
            this.nickname1 = res.data.data[0].nickName
            this.avatar1 = res.data.data[0].avatar
            console.log(this.nickname1)
            console.log(this.avatar1)
          })
          .catch(err => {
            console.log(err)
          })
      },
      scrolltolower () {
        if (this.competitionList.length < 20) {
          this.pages = null
        }
        this.$fly.get(`https://www.wjxweb.cn:789/Demand/all/${this.pages}?type=keywords&value=comp`)
          .then(res => {
            this.competitionList = this.competitionList.concat(res.data.data)
            if (res.data.data.length < 20) {
              this.pages = null
              // 这个地方不行！！！设置为null之后如果去发布页post数据，再重新渲染数据就会不成功，因为url错了！！
              this.buttom = true
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
          date: item.date,
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
              /* 这个是干嘛的 忘了 */
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
          })
          .catch(err => {
            console.log(err)
          })
        wx.switchTab({
          url: '/pages/conversation/main'
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
  margin: 20rpx 20rpx 20rpx 120rpx
}
.competitionBox{
  border:3px solid black;
  margin: 0 20rpx 20rpx 20rpx;
  border-radius: 20px;
}
.buttom{
  text-align: center
}
</style>
