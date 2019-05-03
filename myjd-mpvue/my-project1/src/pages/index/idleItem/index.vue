<template>
  <div class="idleItem">
    <p class="title">闲置物转出</p>
    <div v-for="(item, index) in itemList" :key="index" class="idleItemBox">
      <ul>
        <li>详情：{{ item.name }}</li>
      </ul>
      <ul>
        <li>价格：{{ item.price }}</li>
      </ul>
      <button @click="toPublisher(item)">收入囊中（联系卖主）</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        itemList: [],
        belongTo: 0,
        thingId: 0,
        detail: '',
        price: '',
        saleTo: 0
      }
    },
    onLoad () {
      this.$fly.get('https://www.wjxweb.cn:789/setAsideGoods/all/1')
        .then(res => {
          console.log(res)
          this.itemList = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
      this.$fly.get(`https://www.wjxweb.cn:789/User/all/1?type=wxOpen&value=${this.$store.state.openId}`)
        .then(res => {
          console.log(res)
          // 拿到接受需求的人的openid，点击按钮的时候，就调用put修改saleTo为此人openId的对应User表里面的id
          this.saleTo = res.data.data[0].id
        })
        .catch(err => {
          console.log(err)
        })
    },
    methods: {
      toPublisher (item) {
        console.log(item.belongTo)
        this.belongTo = item.belongTo
        this.thingId = item.id
        this.datail = item.name
        this.price = item.price
        console.log(this.belongTo)
        console.log(this.thingId)
        this.$fly.get(`https://www.wjxweb.cn:789/User/all/1?type=id&value=${this.belongTo}`)
          .then(res => {
            console.log(res)
            console.log(res.data.data[0].wxOpen)
            // 这里能够拿到这条需求的发布者的openid
          })
          .catch(err => {
            console.log(err)
          })
        this.$fly.put('https://www.wjxweb.cn:789/setAsideGoods', {
          belongTo: this.belongTo,
          date: new Date(),
          id: this.thingId,
          imgUrl: 'string',
          isSaled: false,
          name: this.datail,
          price: this.price,
          saleTo: this.saleTo
        })
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
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
  .idleItemBox{
    border:3px solid black;
    margin: 0 20rpx 20rpx 20rpx;
    border-radius: 20px;
  }
</style>
