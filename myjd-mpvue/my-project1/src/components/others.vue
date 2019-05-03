<template>
    <div>
    <div class="title">
        <h2>其他类</h2>
    </div>
    <div class="each">
      <span>需求详情：</span>
      <input type="textarea" v-model="detail" placeholder="请输入需求详情"/>
    </div>
    <div class="each">
      <span>报酬：</span>
      <input type="textarea" v-model="price" placeholder="可填可不填"/>
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
      datail: '',
      price: '0',
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
        belongTo: this.belongTo,
        date: new Date(),
        detail: this.detail,
        id: 0,
        isFind: true,
        keywords: 'others',
        price: this.price,
        servicedMan: 0
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


