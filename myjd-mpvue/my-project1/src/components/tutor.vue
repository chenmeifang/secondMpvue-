<template>
    <div>
    <div class="top">
        <h2>家教类</h2>
    </div>
    <div class="each">
      <span>课程详情：</span>
      <input type="textarea" v-model="detail" placeholder="请输入授课对象年级及学科等信息"/>
    </div>
    <div class="each">
      <span>上课地点：</span>
      <input type="textarea" v-model="workPlace" placeholder="请输入授课地点"/>
    </div>
    <div class="each">
      <span>授课薪水：</span>
      <input type="textarea" v-model="salary" placeholder="请输入上课报酬"/>
    </div>
    <i-button @click="handleClick" type="primary" shape="circle">发布</i-button>
    <i-toast id="toast" />
    </div>
</template>
<script>
import { $Toast } from '../../static/dist/base/index'
export default {
  data () {
    return {
      detail: '',
      salary: '',
      workPlace: '',
      userAva: ''
    }
  },
  onLoad () {
    this.getSomeUserInfo()
    // this.showHint()
  },
  methods: {
    // 但实际上显示完这个之后用户若执意仍去发布消息还是可以发布，只是她们误以为不可以
    showHint () {
      wx.showToast({
        icon: 'none',
        title: '因该类需求涉及同学较大利益，为保证家教信息可靠，故该类消息由腾飞有限公司统一发布',
        duration: 6000
      })
    },
    /* 拿到发布者的一些信息,用于点击发布按钮post数据的时候,
       tutor表没有belongTo和belongUsername，所以这里没有拿到
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
      this.$fly.post('https://www.wjxweb.cn:789/Tutor', {
        date: new Date(),
        detail: this.detail,
        id: 0,
        isFind: false,
        salary: this.salary,
        serviceMan: null,
        workPlace: this.workPlace,
        userAva: this.userAva
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


