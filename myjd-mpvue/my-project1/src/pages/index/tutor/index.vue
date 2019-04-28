<template>
    <div>
        <p class="title">家教</p>
        <div v-for="item in tutorList" :key="item" class="tutorBox">
           <ul>
            <li>课程详情：{{ item.detail }}</li>
            <li>上课地点：{{ item.workPlace}}</li>
            <li>上课报酬：{{ item.salary }}</li>
           </ul>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      tutorList: []
    }
  },
  onLoad () {
    this.$fly.get('https://www.wjxweb.cn:789/Tutor/all/1').then((res) => {
      console.log(res)
      console.log('家教类')
      this.tutorList = res.data.data
      console.log(res.data.data)
    })
  }
}
</script>
<style scoped>
.title {
    text-align: center;
    margin-bottom: 50rpx
  }
.tutorBox{
  /* border-left: 2px solid cornflowerblue;
  border-right: 2px solid cornflowerblue;
  border-top: 2px solid cornflowerblue; */
  margin-left: 20rpx;
  margin-right: 2rpx;
  margin-bottom: 20rpx
}
</style>


