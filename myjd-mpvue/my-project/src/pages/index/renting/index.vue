<template>
  <div class="twoHandsBook">
    <p class="title">租房及转租</p>
    <p>_________________________________________________</p>
        <div v-for="item in rentList" :key="item" class="rentBox">
           <ul>
            <li>房子内部细节：{{ item.detail }}</li>
            <li>地点：{{ item.place }}</li>
            <li>房租：{{ item.price }}</li>
           </ul>
           <p>_________________________________________________</p>
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
    created () {
      this.$fly.get('https://www.wjxweb.cn:789/Renting/all/1').then(res => {
        console.log(res)
        console.log(res.data.data)
        this.rentList = res.data.data
        console.log('啊啊啊啊啊啊')
      })
    }
  }
</script>

<style scoped>
  .title {
    text-align: center;
    font-size: 30px;
  }
</style>
