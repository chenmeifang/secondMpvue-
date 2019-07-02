<template>
  <div>
    <p class="title">快递</p>
    <p>_________________________________________________</p>
    <ul v-for="(item, index) in expressList" :key="index">
      <li>发布者：{{ item.studentNumber }}</li>
      <li>详情：{{ item.detail }}</li>
      <li>赏金：{{ item.price }}</li>
      <button class="accept" @click="accept">接受</button>
      <p>_________________________________________________</p>
    </ul>
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
  created: function () {
    this.$fly.get('https://www.wjxweb.cn:789/Demand/all/1')
      .then((res) => {
        console.log(res)
        this.expressList = res.data.data
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    accept () {
      console.log(2)
    }
  }
}
</script>

<style scoped>
.title {
  text-align: center;
  /* font-size: 30px; */
}
</style>
