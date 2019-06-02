<template>
  <div>
    <i-notice-bar icon="remind" color="#6495ED" backgroundcolor="#FFFFFF" loop closable>
      若交易谈妥，建议及时删除发布的需求！！！
    </i-notice-bar>
    <i-tabs :current="current" color="#6495ED" @change="handleChange">
      <i-tab key="tab1" title="当前联系人"></i-tab>
      <i-tab key="tab2" title="历史联系人"></i-tab>
    </i-tabs>
    <div class="linkMan-list"
         v-for="(item, index) in list"
         :key="index"
         v-show="isDisplay">
      <i-swipeout  i-class="i-swipeout-demo-item" :actions="actions" @change="handleDelete(item)">
        <view slot="content">
          <div class="contact" v-show="item.isDisplay">
            <img class="avatar" :src=item.avatar @click="nav(item)">
            <div class="name">{{ item.nickname }}</div>
          </div>
        </view>
      </i-swipeout>
    </div>
    <div class="linkMan-list"
         v-for="(item, index) in list"
         :key="index"
         v-show="!isDisplay">
      <i-swipeout  i-class="i-swipeout-demo-item">
        <view slot="content">
          <div class="contact" v-show="!item.isDisplay">
            <img class="avatar" :src=item.avatar @click="nav(item)">
            <div class="name">{{ item.nickname }}</div>
          </div>
        </view>
      </i-swipeout>
    </div>
    <div class="whaleAndText" v-show="is" :style="{'left': (windowWidth - 160) / 2 + 'px' }">
      <img class="whale" src="../../../static/images/whale.jpeg"/>
      <span>暂无联系人</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        isDisplay: true,
        current: 'tab1',
        content: '',
        list: [],
        me: '',
        windowHeight: 0,
        windowWidth: 0,
        is: true,
        isDelete: true,
        actions: [
          {
            name: '删除',
            color: '#fff',
            fontsize: '20',
            width: 100,
            icon: 'close',
            background: '#ed3f14'
          }
        ]
      }
    },
    // 这里把onshow改为onload试试
    onShow () {
      this.$store.commit('judgeNewUser')
      this.windowHeight = this.$store.state.windowHeight
      this.windowWidth = this.$store.state.windowWidth
      this.me = this.$store.state.userInformation.id
      this.showData()
      // this.current = 'tab1'
    },
    methods: {
      handleChange (res) {
        console.log(res)
        this.current = res.mp.detail.key
        this.isDisplay = !this.isDisplay
      },
      showData () {
        this.$fly.get(`https://www.wjxweb.cn:789/Contact/all/1?type=fromWho&value=${this.me}`)
          .then(res => {
            console.log(res)
            res.data.data.forEach(value => {
              value.isDisplay = Boolean(value.isDisplay)
            })
            this.list = res.data.data
            if (res.data.data.length !== 0) {
              this.is = false
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      nav (item) {
        wx.navigateTo({
          url: `chatPage/main?name=${item.nickname}&toWho=${item.toWho}&ava=${item.avatar}`
        })
      },
      handleDelete (item) {
        item.isDisplay = false
        this.$fly.put('https://www.wjxweb.cn:789/Contact', {
          id: item.id,
          fromWho: item.fromWho,
          toWho: item.toWho,
          nickname: item.nickname,
          avatar: item.avatar,
          isDisplay: ''
        })
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
</script>

<style scoped>
.whaleAndText{
  width: 160px;
  position: relative;
  top:70px;
  text-align: center
}
.whale{
  width: 160px;
  height: 120px;
}
span{
  color: #495060;
  font-size: 15px
}
.contact{
  position: relative;
}
.avatar {
  width: 128rpx;
  height: 128rpx;
  border-radius: 50%;
  float:left;
  margin: 10rpx 0 10rpx 10rpx
}
.name{
  float:left;
  margin: 15rpx 0 0 10rpx 
}
</style>
