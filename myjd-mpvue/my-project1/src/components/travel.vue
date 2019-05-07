<template>
    <div>
    <div class="top">
        <h2>驾校类</h2>
    </div>
    <div class="each">
      <span>旅游地点：</span>
      <input type="textarea" v-model="place" placeholder="请输入旅游地点"/>
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
      place: '',
      belongTo: 0
    }
  },
  onLoad () {
    console.log('pppppppp' + this.$store.state.openId)
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
      this.$fly.post('https://www.wjxweb.cn:789/Travel', {
        belongTo: this.belongTo,
        id: 0,
        isFull: false,
        number: 0,
        place: this.place,
        time: new Date()
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


