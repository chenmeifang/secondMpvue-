<template>
    <div>
    <div class="title">
        <h2>兼职类</h2>
    </div>
    <div class="each">
        <span>工作细节：</span>
        <input type="textarea" v-model="detail" placeholder="请输入工作细节"/>
    </div>
    <div class="each">
        <span>工作地点：</span>
        <input type="textarea" v-model="workplace" placeholder="请输入工作地点"/>
    </div>
    <div class="each">
        <span>工作报酬：</span>
        <input type="textarea" v-model="salary" placeholder="请输入工作报酬"/>
    </div>
    <div class="each">
        <span>需要人数：</span>
        <input type="textarea" v-model="needNum" placeholder="请输入需要人数"/>
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
      workplace: '',
      salary: '',
      needNum: '',
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
        title: '因该类需求涉及同学较大利益，为保证兼职信息可靠，故该类消息由腾飞有限公司统一发布',
        duration: 6000
      })
    },
    /* 拿到发布者的一些信息,用于点击发布按钮post数据的时候,
       partTimeJob表没有belongTo和belongUsername，所以这里没有拿到
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
      if (this.detail === '' || this.workplace === '' || this.salary === '' || this.needNum === '') {
        wx.showToast({
          title: '每一项均不能为空',
          icon: 'none',
          duration: 2000
        })
      } else {
        this.$fly.post('https://www.wjxweb.cn:789/PartTimeJob', {
          id: 0,
          detail: this.detail,
          workplace: this.workplace,
          salary: this.salary,
          needNum: this.needNum,
          userAva: this.userAva,
          alreadyNum: 0,
          date: new Date(),
          isFind: false
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


