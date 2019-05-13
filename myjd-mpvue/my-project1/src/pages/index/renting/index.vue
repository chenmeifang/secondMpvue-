<template>
  <div class="twoHandsBook">
    <p class="title">租房及转租</p>
    <scroll-view
    :style="{'height': '550px'}"
    :scroll-y="true"
    @scrolltolower="scrolltolower">
        <div v-for="item in rentList" :key="item" class="rentBox">
           <ul>
            <li>内部配置：{{ item.detail }}</li>
            <li>大概位置：{{ item.place }}</li>
            <li>房租：{{ item.price }}</li>
           </ul>
           <button @click="toPublisher(item)">去租房(联系发布人)</button>
        </div>
    </scroll-view>   
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
      this.pages = 1
      this.$fly.get('https://www.wjxweb.cn:789/Renting/all/1')
        .then(res => {
          console.log('租房及转租')
          this.rentList = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    methods: {
      toPublisher (item) {
      }
    }
  }
</script>

<style scoped>
  .title {
    text-align: center;
    margin-bottom: 50rpx
  }
  li{
    margin: 20rpx
  }
  .rentBox{
    border:3px solid black;
    margin-left: 20rpx;
    margin-right: 20rpx;
    margin-bottom: 20rpx;
    border-radius: 20px;
    text-align: center
  }
</style>
