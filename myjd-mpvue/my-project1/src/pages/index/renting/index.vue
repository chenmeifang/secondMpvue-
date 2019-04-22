<template>
  <div class="twoHandsBook">
    <p class="title">租房及转租</p>
    <p>_________________________________________________________________</p>
        <div v-for="item in rentList" :key="item" class="rentBox">
           <ul>
            <li>房子内部配置：{{ item.detail }}</li>
            <li>房子大概位置：{{ item.place }}</li>
            <li>房租：{{ item.price }}</li>
           </ul>
           <p>__________________________________________________________________</p>
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
    /* created () {
      this.$fly.get('https://www.wjxweb.cn:789/Renting/all/1').then(res => {
        console.log('租房及转租')
        this.rentList = res.data.data
      })
    } */
    /* onLoad () {
      this.$fly.get('https://www.wjxweb.cn:789/Renting/all/1').then(res => {
        console.log('租房及转租')
        this.rentList = res.data.data
      })
    } */
    onShow () {
      this.$fly.get('https://www.wjxweb.cn:789/Renting/all/1').then(res => {
        console.log('租房及转租')
        this.rentList = res.data.data
      })
    }
    /* beforeUpdate的触发时机是当data里面的数据改变 */
    /* beforeUpdate () {
      this.$fly.get('https://www.wjxweb.cn:789/Renting/all/1').then(res => {
        console.log('租房及转租')
        this.rentList = res.data.data
      })
    } */
  }
</script>

<style scoped>
  .title {
    text-align: center;
    /* font-size: 30px; */
  }
</style>
