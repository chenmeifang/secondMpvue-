<template>
    <div>
    <div class="top">
        <h2>租房及转租</h2>
    </div>
    <!-- <i-panel title="基础用法">
        <i-input v-model="detail" type="textarea" title="房子内部配置：" autofocus placeholder="请输入房子细节" maxlength="50"/>
        <i-input v-model="place" type="textarea" title="房子大概位置：" placeholder="请输入房子大概位置"  />
        <i-input v-model="price" type="textarea" title="房租：" placeholder="请输入房租"  />
    </i-panel> -->
    <div class="each">
      <span>房子内部配置：</span>
      <input type="textarea" v-model="detail"/>
    </div>
    <div class="each">
      <span>房子大概位置：</span>
      <input type="textarea" v-model="place"/>
    </div>
    <div class="each">
      <span>房子大概价钱：</span>
      <input type="textarea" v-model="price"/>
    </div>
    <i-button @click="handleClick" type="primary" shape="circle">发布</i-button>
    </div>
</template>
<script>
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
      // console.log(this.detail)
      /* this.$fly.get('https://www.wjxweb.cn:789/Renting/all/1').then(res => {
        console.log('租房及转租')
        this.rentList = res.data.data
      }) */
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
  width:487rpx
}
</style>


