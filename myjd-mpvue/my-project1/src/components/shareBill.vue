<template>
    <div>
    <div class="top">
        <h2>拼单类</h2>
    </div>
    <div class="each">
      <span>拼单详情：</span>
      <input type="textarea" v-model="detail" placeholder="请输入拼单详情"/>
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
      detail: '',
      belongTo: 0,
      userAva: '',
      belongUsername: ''
    }
  },
  onLoad () {
    this.getSomeUserInfo()
  },
  methods: {
    // 拿到发布者的一些信息,用于点击发布按钮post数据的时候
    getSomeUserInfo () {
      this.$fly.get(`https://www.wjxweb.cn:789/User/all/1?type=wxOpen&value=${this.$store.state.openId}`)
        .then(res => {
          console.log(res)
          this.belongTo = res.data.data[0].id
          this.userAva = res.data.data[0].avatar
          this.belongUsername = res.data.data[0].nickName
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleClick () {
      if (this.detail === '') {
        wx.showToast({
          title: '拼单详情不能为空',
          icon: 'none',
          duration: 2000
        })
      } else {
        this.$fly.post('https://www.wjxweb.cn:789/Demand', {
          id: 0,
          belongTo: this.belongTo,
          detail: this.detail,
          price: 0,
          isFind: false,
          keywords: 'shareBill',
          serviceMan: null,
          date: new Date(),
          userAva: this.userAva,
          belongUsername: this.belongUsername
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
}
</script>
<style scoped>
.top{
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


