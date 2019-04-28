<template>
  <div class="whole">
    <div class="displayRoom">
      <p class="header">wjx</p>
      <div class="msg_room" v-for="(item, index) in allList"  :key="index">
        <div class="li1"><img class="userinfo-avatar-left" src="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIWgpgEACljAEoKgSQWAdSICPuOkiavAyyRuebzFoXJW1AU9BcGCltFySVnTWeNQ0rUeZPbFLftESA/132" v-if="(item.fromTo ===  '5-' + myId)"></div>
        <div class="li2">
          <ul>
            <li class="time_room">{{ item.date }}</li>
            <li>{{ item.content }}</li>
          </ul>
        </div>
        <div class="li3"><img class="userinfo-avatar-right" :src=user.avatar v-if="(item.fromTo ===  myId +  '-5')"></div>
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
        msg: '',
        reservedList: [],
        sendList: [],
        allList: [],
        myId: ''
      }
    },
    onLoad () {
      this.myId = this.$store.state.userInformation[0].id
      // 设置定时器，不断从服务器取得数据，轮询是一种性能比较差的方法
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
        return this.$store.state.userInformation[0]
      }
    },
    methods: {
      sortById (array, key) {
        // 根据id排序，由于id自增，id排序等于时间排序
        return array.sort(function (a, b) {
          const x = a[key]
          const y = b[key]
          return ((x < y) ? -1 : ((x > y) ? 1 : 0))
        })
      },
      getReserved () {
        // 别人发给我的消息
        this.$fly.get(`https://www.wjxweb.cn:789/Message/all/1?type=fromTo&value=5-${this.myId}`)
          .then((res) => {
            this.reservedList = res.data.data
            // 时间格式化
            this.reservedList.forEach((value) => {
              value.date = formatTime(new Date(value.date))
            })
          })
      },
      getSend () {
        // 我发给别人的消息
        this.$fly.get(`https://www.wjxweb.cn:789/Message/all/1?type=fromTo&value=${this.myId}-5`)
          .then((res) => {
            this.sendList = res.data.data
            // 时间格式化
            this.sendList.forEach((value) => {
              value.date = formatTime(new Date(value.date))
            })
          })
      },
      handleList () {
        // 将我发送的消息和别人发给我的消息添加到一块
        this.allList = this._data.reservedList.concat(this._data.sendList)
      },
      sendMsg () {
        // 发送消息
        this.$fly.post('https://www.wjxweb.cn:789/Message', {
          'id': 0,
          'content': this.msg,
          'date': new Date(),
          'fromTo': this.myId + '-5',
          'toFrom': null,
          'fromWho': this.myId,
          'toWho': 5
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
  img {
    width: 85rpx;
    height: 85rpx;
    border-radius: 50%;
  }
  input {
    height: 36px;
    border-radius: 10px;
    border:3px solid #ffd9bd;
    background: #f6f7ff;
  }
  .displayRoom {
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: center;
    background: linear-gradient(to bottom right, #63b5f0, #ffd3c7);
    border-radius:25px;
  }
  .header {
    text-align: center;
    background-color: #26324b;
    color: white;
  }
  .msg_room {
    text-align: center;
  }
  .li1 {
    float: left;
    width: 15%;
    height: 100px;
  }
  .li2 {
    float: left;
    width: 70%;
    height: 100%;
  }
  .li3 {
    float: left;
    width: 15%;
    height: 100px;
  }
  .time_room {
    font-size: 15px;
  }
</style>
