<template>
    <div>
    <div class="title">
        <h2>其他类</h2>
    </div>
    <div class="each">
      <span>需求详情：</span>
      <input type="textarea" v-model="detail" placeholder="请输入需求详情"/>
    </div>
    <div class="each">
      <span>报酬：</span>
      <input type="textarea" v-model="price" placeholder="请输入报酬"/>
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
      datail: '',
      price: '',
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
      if (this.detail === '' && this.price === '') {
        wx.showToast({
          title: '详情和报酬不能为空',
          icon: 'none',
          duration: 2000
        })
      } else if (this.price === '') {
        wx.showToast({
          title: '报酬不能为空',
          icon: 'none',
          duration: 2000
        })
      } else if (this.detail === '') {
        wx.showToast({
          title: '详情不能为空',
          icon: 'none',
          duration: 2000
        })
      } else {
        this.$fly.post('https://www.wjxweb.cn:789/Demand', {
          belongTo: this.belongTo,
          date: new Date(),
          detail: this.detail,
          id: 0,
          isFind: false,
          keywords: 'others',
          price: this.price,
          servicedMan: 0,
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


