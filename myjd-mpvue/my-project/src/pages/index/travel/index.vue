<template>
  <div class="twoHandsBook">
    <p class="title">旅游</p>
    <div v-for="item in travelList" :key="item" class="TravelBox">
          <div class="left">
          <ul>
            <li>旅游地点：{{ item.place }}</li>
            <!-- <li>上课地点：{{ item.workPlace}}</li> -->
            <!-- <li>上课报酬：{{ item.salary }}</li> -->
          </ul>
          </div>
          <div class="pattern">
          </div>
    </div>     
  </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        travelList: []
      }
    },
    created () {
      this.$fly.get('https://www.wjxweb.cn:789/Travel/all/1').then(res => {
        console.log(res)
        this.travelList = res.data.data
        // console.log(this.travelList)
        console.log('呀呀呀')
      })
    }
  }
</script>

<style scoped>
  .title {
    text-align: center;
    /* font-size: 30px; */
  }
  .left{
    float: left
  }
  .pattern{
    float: right;
    width:50px;
    height:50px;
    margin-top:20px; 
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
    background-color:cornflowerblue;
  }
</style>
