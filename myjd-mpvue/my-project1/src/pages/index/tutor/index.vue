<template>
    <div class="all">
        <p class="title">家教</p>
        <div v-for="item in tutorList" :key="item" class="tutorBox">
           <ul>
            <li>课程详情：{{ item.detail }}</li>
            <li>上课地点：{{ item.workPlace}}</li>
            <li>上课报酬：{{ item.salary }}</li>
           </ul>
           <button @click="toPublisher(item)">做家教(联系发布人)</button>
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
    this.$fly.get('https://www.wjxweb.cn:789/Tutor/all/1')
      .then((res) => {
        console.log(res)
        console.log('家教类')
        this.tutorList = res.data.data
        console.log(res.data.data)
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
.tutorBox{
  border:3px solid black;
  margin-left: 20rpx;
  margin-right: 20rpx;
  margin-bottom: 20rpx;
  border-radius: 20px;
  text-align: center
}
</style>


