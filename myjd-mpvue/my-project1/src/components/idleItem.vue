<template>
    <div>
    <div class="top">
        <h2>闲置物转出</h2>
    </div>
    <div class="each">
      <span>闲置物详情：</span>
      <input type="textarea" v-model="name" placeholder="请输入闲置物详情"/>
    </div>
    <!-- <i-panel title="基础用法"> -->
        <!-- <i-input type="textarea" title="闲置物详情：" autofocus placeholder="请输入闲置物详情" maxlength="50"/> -->
        <!-- <i-input type="text" title="工作其他细节：" placeholder="请输入工作其他细节" /> -->
        <!-- <i-input type="text" title="价格：" placeholder="请输入价格"  /> -->
    <!-- </i-panel> -->
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
        /* belongTo: 'string',
        date: new Date(),
        id: 0,
        imgUrl: 'string',
        isSaled: true,
        name: this.name,
        price: 'string',
        saleTo: 'string' */
        id: 0,
        belongTo: 'string',
        name: this.name,
        price: 'string',
        imgUrl: 'string',
        date: new Date(),
        isSaled: true,
        saleTo: 'string'
      }).then(res => {
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
  width:525rpx
}
</style>


