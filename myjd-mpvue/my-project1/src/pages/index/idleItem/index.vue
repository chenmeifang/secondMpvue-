<template>
  <div class="all">
    <i-notice-bar icon="remind" color="#6495ED" backgroundcolor="#FFFFFF" loop closable>
      点击蓝色图标联系发布人，点击红色图标删除（仅发布该条记录的人删除有效）
    </i-notice-bar>
    <p class="title">闲置物转出</p>
    <scroll-view
    :style="{'height': windowHeight + 'px'}"
    :scroll-y="true"
    @scrolltolower="scrolltolower">
      <div v-for="(item, index) in itemList" :key="index" v-show='!item.isSaled' class="idleItemBox">
        <div class="topDiv">
          <div class="avatarDiv"><img :src="item.userAva" class="avatar"/></div>
          <div class="nicknameDiv">{{ item.belongUsername }}</div>
          <div class="deleteDiv" @click="Delete(item)"></div>
          <div class="acceptDiv" @click="toPublisher(item)"></div>
        </div>
        <div class="idleItemImgBox"><img :src="item.imgUrl" class="idleItemImg" @click="preview(item)"/></div>
        <div class="details" :style="{'width': windowWidth - 160 + 'px'}">
          <ul>
            <li>详情：{{  item.name  }}</li>
            <li>价格：{{  item.price  }}</li>
          </ul>
        </div>
        <div class="date">{{ item.date }}</div>
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
        itemList: [],
        saleTo: 0,
        nickname1: '', /* 接受这条需求的人的Nickname */
        nickname2: '', /* 发布这条需求的人的Nickname */
        avatar1: '',
        avatar2: '',
        is: false,
        count: 0,
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
    methods: {
      showData () {
        this.pages = 1
        this.$fly.get(`https://www.wjxweb.cn:789/setAsideGoods/all/${this.pages}`)
          .then(res => {
            console.log(res)
            res.data.data.forEach(value => {
              value.date = formatTime1(new Date(value.date))
            })
            this.itemList = res.data.data
            this.count = res.data.count / 20
          })
          .catch(err => {
            console.log(err)
          })
      },
      scrolltolower () {
        if (this.count > this.pages) {
          this.pages++
          this.$fly.get(`https://www.wjxweb.cn:789/setAsideGoods/all/${this.pages}`)
            .then(res => {
              res.data.data.forEach(value => {
                value.date = formatTime1(new Date(value.date))
              })
              this.itemList = this.itemList.concat(res.data.data)
            })
            .catch(err => {
              console.log(err)
            })
        }
      },
      /* 点击收入囊中（联系卖主）的按钮时，要用this.$fly.put修改需求表中的对应的需求的saleTo和isSaled属性 */
      toPublisher (item) {
        this.saleTo = this.$store.state.userInformation.id
        this.$fly.get(`https://www.wjxweb.cn:789/Contact/all/1?type=fromWho&value=${this.saleTo}`)
          .then(res => {
            res.data.data.forEach(value => {
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
          })
          .catch(err => {
            console.log(err)
          })
        wx.switchTab({
          url: '/pages/conversation/main'
        })
      },
      preview (item) {
        wx.previewImage({
          current: item.imgUrl, // 当前显示图片的http链接
          urls: [item.imgUrl] // 需要预览的图片http链接列表
        })
      },
      Delete (item) {
      // 点击删除按钮的人跟发布该需求的人是否匹配
        if (item.belongTo === this.$store.state.userInformation.id[0].toString()) {
          this.$fly.put('https://www.wjxweb.cn:789/setAsideGoods', {
            belongTo: item.belongTo,
            date: new Date(),
            id: item.id,
            imgUrl: item.imgUrl,
            isSaled: true,
            name: item.name,
            price: item.price,
            saleTo: this.saleTo,
            userAva: item.userAva,
            belongUsername: item.belongUsername
          })
            .then(res => {
              console.log(res)
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
.idleItemBox{
  height: 400rpx;
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
.idleItemImgBox{
  display: inline-block
}
.idleItemImg{
  width: 250rpx;
  height: 250rpx;
  }
.details{
  width: 400rpx;
  float: right;
  margin-right: 20rpx
}
.date{
  font-size: 25rpx;
  float: right
}
</style>
