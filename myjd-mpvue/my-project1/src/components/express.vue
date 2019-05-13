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
      belongTo: 0,
      userAva: ''
    }
  },
  onLoad () {
    console.log(this.$store.state.openId)
    /* 要是在第一页没有对应的值，应该是会报错，居然没有报错！！！算了这里先不管到时候问一下吴迪
    难道在第一页匹配不到后面跟的参数会自动去第二页搜索？？？
    */
    this.$fly.get(`https://www.wjxweb.cn:789/User/all/1?type=wxOpen&value=${this.$store.state.openId}`)
      .then(res => {
        console.log(res)
        console.log('啊啊啊啊啊')
        this.belongTo = res.data.data[0].id
        this.userAva = res.data.data[0].avatar
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
        servicedMan: null,
        date: new Date(),
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


