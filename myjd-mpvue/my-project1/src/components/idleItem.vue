<template>
    <div>
    <div class="title">
        <p>闲置物转出</p>
    </div>
    <div class="each">
      <span>闲置物详情：</span>
      <input type="textarea" v-model="name" placeholder="请输入闲置物详情"/>
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
      name: ''
    }
  },
  methods: {
    handleClick () {
      this.$fly.post('https://www.wjxweb.cn:789/setAsideGoods', {
        id: 0,
        belongTo: 'string',
        name: this.name,
        price: 'string',
        imgUrl: 'string',
        date: new Date(),
        saleTo: 'string',
        isSaled: true
      }).then(res => {
        console.log('44444444444')
        console.log(res)
      }).catch(err => {
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
  width:525rpx
}
</style>


