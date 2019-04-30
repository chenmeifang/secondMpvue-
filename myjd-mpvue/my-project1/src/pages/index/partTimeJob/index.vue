<template>
  <div class="partTimeJob">
    <p class="title">兼职</p>
    <div v-for="item in partTimeJobList" :key="item" class="partTimeJobBox">
      <ul>
        <li>工作细节：{{ item.detail }}</li>
        <li>工作地点：{{ item.workplace }}</li>
        <li>工作报酬：{{ item.salary }}</li>
        <li>需要人数：{{ item.num }}</li>
      </ul>
    </div>
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
      this.$fly.get('https://www.wjxweb.cn:789/PartTimeJob/all/1')
        .then(res => {
          console.log(res)
          this.partTimeJobList = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
</script>
<style scoped>
.title {
    text-align: center;
    margin-bottom: 50rpx
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

