<template>
    <div>
    <div class="top">
        <h2>竞赛组队类</h2>
    </div>
    <div class="each">
      <span>竞赛详情：</span>
      <input type="textarea" v-model="detail" placeholder="请输入竞赛详情"/>
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
      detail: ''
    }
  },
  methods: {
    handleClick () {
      this.$fly.post('https://www.wjxweb.cn:789/Demand', {
        id: 0,
        studentNumber: 0,
        detail: this.detail,
        price: 0,
        isFind: false,
        keywords: '竞赛组队',
        serviceMan: null,
        date: new Date()
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


