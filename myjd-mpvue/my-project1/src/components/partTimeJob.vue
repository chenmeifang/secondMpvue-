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
        <input type="textarea" v-model="num" placeholder="请输入需要人数"/>
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
      num: ''
    }
  },
  methods: {
    handleClick () {
      this.$fly.post('https://www.wjxweb.cn:789/PartTimeJob', {
        id: 0,
        detail: this.detail,
        workplace: this.workplace,
        salary: this.salary,
        num: this.num,
        isReview: true,
        isFull: true
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


