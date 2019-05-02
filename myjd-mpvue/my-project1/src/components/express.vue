<template>
    <div>
    <div class="title">
        <p>快递类</p>
    </div>
    <div class="each">
        <span>快递位置：</span>
        <input tyep="textarea" v-model="detail" placeholder="请输入快递位置（不要输快递单号）"/>
    </div>
    <div class="each">
        <span>报酬：</span>
        <input tyep="textarea" v-model="price" placeholder="请输入报酬"/>
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
      price: '',
      belongTo: 0
    }
  },
  onLoad () {
    console.log('pppppppp' + this.$store.state.openId)
    // this.$fly.get('https://www.wjxweb.cn:789/User/all/1?type=wxOpen&value=this.$store.state.openId')
    this.$fly.get(`https://www.wjxweb.cn:789/User/all/1?type=wxOpen&value=${this.$store.state.openId}`)
      .then(res => {
        console.log(res)
        this.belongTo = res.data.data[0].id
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    handleClick () {
      this.$fly.post('https://www.wjxweb.cn:789/Demand', {
        id: 0,
        belongTo: this.belongTo,
        detail: this.detail,
        price: this.price,
        isFind: false,
        keywords: 'express',
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
.title{
    margin-bottom: 50rpx
}
p{
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


