<template>
  <div class="whole">
    <div class="displayRoom">
      <p class="header">{{ name }}</p>
      <div class="chat_content_room" v-for="(item, index) in allList"  :key="index">
        <ul>
          <li class="ava_msg.left"><img class="userinfo-avatar" :src=ava v-show="reserve"></li>
          <li class="ava_msg">
            <ul>
              <li class="time_room">{{ item.date }}</li>
              <li class="word_room">{{ item.content }}</li>
            </ul>
          </li>
          <li class="ava_msg.right"><img class="userinfo-avatar" :src=user.avatarUrl v-show="send"></li>
        </ul>
        <i-divider></i-divider>
      </div>
    </div>
    <div class="footer">
      <label><input type="text" v-model="msg"></label>
      <i-button i-class="i-button" type="primary" @click="sendMsg">发送</i-button>
    </div>
  </div>
</template>

<script>
  // fly,生命周期，时间格式化，数组合并，定时器，排序
  import { formatTime } from '../../../utils'

  export default {
    name: 'index',
    data () {
      return {
        ava: '',
        name: '',
        sendId: '',
        MSG: '',
        reservedList: [],
        sendList: [],
        allList: [],
        reserve: true,
        send: true
      }
    },
    onLoad (option) {
      this.name = option.name
      this.sendId = option.toWho
      this.ava = option.ava
      setInterval(this.getReserved, 200)
      setInterval(this.getSend, 200)
    },
    onReady () {
      setInterval(this.handleList, 200)
    },
    computed: {
      sortAllList () {
        return this.sortById(this.allList, 'id')
      },
      user () {
        return this.$store.state.userInformation
      }
    },
    methods: {
      send (item) {
        console.log(item)
        console.log(this.allList)
      },
      sortById (array, key) {
        return array.sort(function (a, b) {
          const x = a[key]
          const y = b[key]
          return ((x < y) ? -1 : ((x > y) ? 1 : 0))
        })
      },
      getReserved () {
        this.$fly.get(`https://www.wjxweb.cn:789/Message/all/1?type=fromTo&value=${this.sendId}-1`)
          .then((res) => {
            this.reservedList = res.data.data
            this.reservedList.forEach((value) => {
              value.date = formatTime(new Date(value.date))
            })
          })
      },
      getSend () {
        this.$fly.get(`https://www.wjxweb.cn:789/Message/all/1?type=fromTo&value=1-${this.sendId}`)
          .then((res) => {
            this.sendList = res.data.data
            this.sendList.forEach((value) => {
              value.date = formatTime(new Date(value.date))
            })
          })
      },
      handleList () {
        this.allList = this._data.reservedList.concat(this._data.sendList)
        const that = this
        this.allList.forEach((value) => {
          if (value.fromTo === `${this.sendId}-1`) {
            that.reserve = true
          }
        })
        // if (this.allList.fromTo === `1-${this.sendId}`) {
        //   this.send = true
        // }
        // if (this.allList.fromTo === `${this.sendId}-1`) {
        //   this.reserve = true
        // }
      },
      sendMsg () {
        this.$fly.post('https://www.wjxweb.cn:789/Message', {
          'id': 0,
          'content': this.msg,
          'date': new Date(),
          'fromTo': '1-' + this.sendId,
          'toFrom': null,
          'fromWho': '1',
          'toWho': this.sendId
        })
          .then((res) => {
            console.log(res)
          })
          .catch((err) => {
            console.log(err)
          })
        this.msg = ''
      }
    }
  }
</script>

<style scoped>
  .footer{
    position: fixed;
    width: 100%;
    bottom: 0;
    background: #e3e7fe;
    text-align: center;
  }
  .displayRoom {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    background: linear-gradient(to bottom right, #63b5f0, #ffe1dd);
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
  .word_room {
    width: 220px;
    border-radius: 25%;
    text-align: center;
    color: white;
    background-color: #4b5982;
  }
  .userinfo-avatar {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
  }
  .time_room {
    font-size: 12px;
    padding: 5px;
  }
 input {
   height: 36px;
   border-radius: 10px;
   border:3px solid #ffd9bd;
   background: #f6f7ff;
 }
  .ava_msg {
    display: inline-block;
  }
  .chat_content_room {
    margin: 15px;
  }
</style>
