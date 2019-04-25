<template>
  <div class="twoHandsBook">
    <p class="title">租房及转租</p>
        <div v-for="item in rentList" :key="item" class="rentBox">
           <ul>
            <li>内部配置：{{ item.detail }}</li>
            <li>大概位置：{{ item.place }}</li>
            <li>房租：{{ item.price }}</li>
           </ul>
        </div>   
  </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        rentList: []
      }
    },
    onShow () {
      this.$fly.get('https://www.wjxweb.cn:789/Renting/all/1').then(res => {
        console.log('租房及转租')
        this.rentList = res.data.data
      })
    }
  }
</script>

<style scoped>
  .title {
    text-align: center;
    margin-bottom: 50rpx
  }
  .rentBox{
    border-left: 2px solid cornflowerblue;
    border-right: 2px solid cornflowerblue;
    border-top: 2px solid cornflowerblue;
    margin-left: 2rpx;
    margin-right: 2rpx;
    margin-bottom: 2rpx
  }
</style>
