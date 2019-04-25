<template>
    <div>
    <div class="title">
        <h2>租房及转租</h2>
    </div>
    <div class="each">
      <span>内部配置：</span>
      <input type="textarea" v-model="detail" placeholder="请输入内部配置"/>
    </div>
    <div class="each">
      <span>大概位置：</span>
      <input type="textarea" v-model="place" placeholder="请输入位置"/>
    </div>
    <div class="each">
      <span>大概房租：</span>
      <input type="textarea" v-model="price" placeholder="请输入房租"/>
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
      id: 0,
      detail: '',
      place: '',
      price: '',
      date: null,
      isFind: true
    }
  },
  methods: {
    handleClick () {
      this.$fly.post('https://www.wjxweb.cn:789/Renting', {
        id: this.id,
        detail: this.detail,
        place: this.place,
        price: this.price,
        date: new Date(),
        isFind: this.isFind
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


