<template>
  <div class="partTimeJob">
    <p class="title">兼职</p>
    <scroll-view
    :style="{'height': '550px'}"
    :scroll-y="true"
    @scrolltolower="scrolltolower">
    <div v-for="item in partTimeJobList" :key="item" class="partTimeJobBox">
      <ul>
        <li>工作细节：{{ item.detail }}</li>
        <li>工作地点：{{ item.workplace }}</li>
        <li>工作报酬：{{ item.salary }}</li>
        <li>需要人数：{{ item.num }}</li>
      </ul>
      <button @click="toPublisher(item)">去工作(联系发布人)</button>
    </div>
    </scroll-view>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        partTimeJobList: []
      }
    },
    onLoad () {
      this.pages = 1
      this.$fly.get('https://www.wjxweb.cn:789/PartTimeJob/all/1')
        .then(res => {
          console.log(res)
          this.partTimeJobList = res.data.data
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
.partTimeJobBox{
  border:3px solid black;
  margin-left: 20rpx;
  margin-right: 20rpx;
  margin-bottom: 20rpx;
  border-radius: 20px;
  text-align: center
}
</style>

