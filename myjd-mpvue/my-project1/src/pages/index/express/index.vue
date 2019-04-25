<template>
  <div>
    <p class="title">快递</p>
    <div v-for="item in expressList" :key="item" class="expressBox">
      <ul>
        <li>详情：{{ item.detail }}</li>
        <li>赏金：{{ item.price }}</li>
      </ul>
    </div>
    <!-- <ul v-for="(item, index) in expressList" :key="index">
      <li>发布者：{{ item.studentNumber }}</li>
      <li>详情：{{ item.detail }}</li>
      <li>赏金：{{ item.price }}</li>
      <button class="accept" @click="accept">接受</button>
    </ul> -->
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      expressList: []
    }
  },
  onLoad () {
    this.$fly.get('https://www.wjxweb.cn:789/Demand/all/1?type=keywords&value=快递')
      .then((res) => {
        console.log(res)
        this.expressList = res.data.data
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    /* accept () {
      console.log(2)
    } */
  }
}
</script>

<style scoped>
.title {
    text-align: center;
    margin-bottom: 50rpx
  }
.expressBox{
  border-left: 2px solid cornflowerblue;
  border-right: 2px solid cornflowerblue;
  border-top: 2px solid cornflowerblue;
  margin-left: 2rpx;
  margin-right: 2rpx;
  margin-bottom: 2rpx
}
</style>
