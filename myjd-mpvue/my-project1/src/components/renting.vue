<template>
    <div>
    <div class="title">
        <h2>租房及转租</h2>
    </div>
    <div class="each">
      <span>内部配置：</span>
      <input type="textarea" v-model="detail" placeholder="请输入内部配置"/>
    </div>
    <div class="each">
      <span>大概位置：</span>
      <input type="textarea" v-model="place" placeholder="请输入位置"/>
    </div>
    <div class="each">
      <span>大概房租：</span>
      <input type="textarea" v-model="price" placeholder="请输入房租"/>
    </div>
    <i-button @click="handleClick" type="primary" shape="circle">发布</i-button>
    <i-toast id="toast"/>
    </div>
</template>
<script>
import { $Toast } from '../../static/dist/base/index'
export default {
  data () {
    return {
      id: 0,
      detail: '',
      place: '',
      price: '',
      userAva: ''
    }
  },
  onLoad () {
    this.getSomeUserInfo()
    this.showHint()
  },
  methods: {
    // 但实际上显示完这个之后用户若执意仍去发布消息还是可以发布，只是她们误以为不可以
    showHint () {
      wx.showToast({
        icon: 'none',
        title: '因该类需求涉及同学较大利益，为保证租房信息可靠，故该类消息由腾飞有限公司统一发布',
        duration: 6000
      })
    },
    /* 拿到发布者的一些信息,用于点击发布按钮post数据的时候,
       renting表没有belongTo和belongUsername，所以这里没有拿到
    */
    getSomeUserInfo () {
      this.$fly.get(`https://www.wjxweb.cn:789/User/all/1?type=wxOpen&value=${this.$store.state.openId}`)
        .then(res => {
          console.log(res)
          this.userAva = res.data.data[0].avatar
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleClick () {
      this.$fly.post('https://www.wjxweb.cn:789/Renting', {
        id: this.id,
        detail: this.detail,
        place: this.place,
        price: this.price,
        date: new Date(),
        isFind: false,
        userAva: this.userAva,
        roomMateNum: 0,
        alreadyNum: 0
      })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
      $Toast({
        content: '发布成功',
        type: 'success'
      })
    }
  }
}
</script>
<style scoped>
.title{
  margin-bottom: 50rpx
}
h2 {
  text-align: center
}
.each{
  margin-bottom: 50rpx
}
input{
  float:right;
  width:563rpx
}
</style>


