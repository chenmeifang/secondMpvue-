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
  },
  methods: {
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


