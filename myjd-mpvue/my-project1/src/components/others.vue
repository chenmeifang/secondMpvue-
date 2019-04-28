<template>
    <div>
    <div class="title">
        <h2>其他类</h2>
    </div>
    <div class="each">
      <span>需求详情：</span>
      <input type="textarea" v-model="detail" placeholder="请输入需求详情"/>
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
      datail: ''
    }
  },
  methods: {
    handleClick () {
      this.$fly.post('https://www.wjxweb.cn:789/Demand', {
        id: 0,
        studentNumber: 0,
        detail: this.detail,
        price: 'string',
        isFind: true,
        keywords: '其他',
        serviceMan: null,
        date: new Date()
      })
        .then(res => {
          console.log('hhhhhhhhh')
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
      //   this.detail = '请输入需求详情'
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


