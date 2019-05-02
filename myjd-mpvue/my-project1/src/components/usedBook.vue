<template>
    <div>
    <div class="top">
        <h2>二手书类</h2>
    </div>
    <div class="each">
      <span>书名：</span>
      <input type="textarea" v-model="bookName" placeholder="请输入书名"/>
    </div>
    <div class="each">
      <span>书价：</span>
      <input type="textarea" v-model="bookPrice" placeholder="请输入书价"/>
    </div>
    <!-- <i-panel title="基础用法"> -->
        <!-- <i-input type="textarea" title="书名：" autofocus placeholder="请输入书名" maxlength="50"/> -->
        <!-- <i-input type="text" title="上课地点：" placeholder="请输入上课地点" /> -->
        <!-- <i-input type="text" title="书价：" placeholder="请输入价格"  /> -->
    <!-- </i-panel> -->
    <i-button @click="handleClick" type="primary" shape="circle">发布</i-button>
    <i-toast id="toast" />
    </div>
</template>
<script>
// const { $Toast } = require('../../dist/base/index');
import { $Toast } from '../../static/dist/base/index'
export default {
  data () {
    return {
      id: 0,
      imgUrl: 'string',
      bookName: '',
      bookPrice: '',
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
      this.$fly.post('https://www.wjxweb.cn:789/TwoHandsBook?', {
        id: this.id,
        bookName: this.bookName,
        bookPrice: this.bookPrice,
        imgUrl: this.imgUrl,
        date: new Date(),
        isSaled: true,
        belongTo: this.belongTo,
        saleTo: 'string'
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
      // this.$mptoast('发布成功')
      // alert('发布成功')
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
  width:637rpx
}
</style>


