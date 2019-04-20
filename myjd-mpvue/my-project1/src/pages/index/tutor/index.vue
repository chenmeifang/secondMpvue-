<template>
    <div>
        <p class="top">家教</p>
        <p>_________________________________________________</p>
        <div v-for="item in tutorList" :key="item" class="tutorBox">
           <ul>
            <li>课程详情：{{ item.detail }}</li>
            <li>上课地点：{{ item.workPlace}}</li>
            <li>上课报酬：{{ item.salary }}</li>
           </ul>
        <p>_________________________________________________</p>
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
  created () {
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
.top{
  text-align: center
}
.tutorBox{
  text-align: center,
}
</style>


