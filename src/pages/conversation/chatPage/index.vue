<template>
  <div class="whole">
    <div class="displayRoom">
        <p class="header">{{ name }}</p>
      <div class="chatRoom">
        <p>{{ chatContentList.date }}</p>
        <p>{{ chatContentList.content }}</p>
      </div>
    </div>
    <div class="input">
      <Input v-model="msg" placeholder="Enter something..."></Input>
      <i-button i-class="i-button" type="primary">发送</i-button>
    </div>
  </div>
</template>

<script>
  import { formatTime } from '../../../utils'

  export default {
    name: 'index',
    data () {
      return {
        name: '',
        msg: '',
        chatContentList: []
      }
    },
    onLoad (option) {
      this.name = option.name
    },
    created () {
      this.$fly.get('https://www.wjxweb.cn:789/Message?id=3')
        .then((res) => {
          console.log(res.data)
          res.data.date = formatTime(new Date(res.data.date))
          this.chatContentList = res.data
          console.log(this.chatContentList)
        })
    },
    methods: {

    }
  }
</script>

<style scoped>
  .input{
    position: absolute;
    top: 80%;
    width: 100%;
    text-align: center;
  }
  .displayRoom {
    position: absolute;
    top: 0;
    width: 100%;
    height: 80%;
    text-align: center;
    background-color: #e4e8ff;
    border-radius:25px;
  }
  .whole {
    margin: 0 auto;
  }
  .header {
    background-color: #26324b;
    color: white;
    border-radius:10%;
  }
</style>
