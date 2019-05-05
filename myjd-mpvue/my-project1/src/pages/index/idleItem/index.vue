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
        saleTo: 0,
        nickname1: '',
        nickname2: '',
        avatar1: '',
        avatar2: ''
      }
    },
    onLoad () {
      /* 在进入到此页面之前，先拿到属于该类别的需求 然后用for循环渲染到页面 */
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
          /* 拿到接受需求的人的openid，点击按钮的时候，就调用put修改saleTo为此人openId的对应User表里面的id */
          this.saleTo = res.data.data[0].id
          this.nickname1 = res.data.data[0].nickName
          this.avatar1 = res.data.data[0].avatar
        })
        .catch(err => {
          console.log(err)
        })
    },
    methods: {
      /* 点击收入囊中（联系卖主）的按钮时，要用this.$fly.put修改需求表中的对应的需求的saleTo和isSaled属性 */
      toPublisher (item) {
        this.$fly.put('https://www.wjxweb.cn:789/setAsideGoods', {
          belongTo: item.belongTo,
          date: new Date(),
          id: item.id,
          imgUrl: 'string',
          isSaled: false,
          name: item.name,
          price: item.price,
          saleTo: this.saleTo
        })
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
        this.$fly.post('https://www.wjxweb.cn:789/Contact', {
          id: 0,
          fromWho: item.belongTo,
          toWho: this.saleTo,
          nickname: this.nickname1,
          avatar: this.avatar1
        })
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
        /* 先拿到发布这条需求的人的nickname和avatar， 首先已经有这个人的id（item.belongTo）*/
        this.$fly.get(`https://www.wjxweb.cn:789/User/all/1?type=id&value=${item.belongTo}`)
          .then(res => {
            this.nickname2 = res.data.data[0].nickName
            this.avatar2 = res.data.data[0].avatar
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
        this.$fly.post('https://www.wjxweb.cn:789/Contact', {
          id: 0,
          fromWho: this.saleTo,
          toWho: item.belongTo,
          /* 这里的nickname和avatar是发布这条需求的人的nickname和avatar */
          nickname: this.nickname2,
          avatar: this.avatar2
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
