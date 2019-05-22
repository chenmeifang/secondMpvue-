<template>
    <div>
    <div class="top">
        <h2>二手书类</h2>
    </div>
    <div class="each">
      <span>书名：</span>
      <input type="textarea" v-model="bookName" placeholder="请输入书名"/>
    </div>
    <div class="each">
      <span>书价：</span>
      <input type="textarea" v-model="bookPrice" placeholder="请输入书价"/>
    </div>
    <div class="each">
      <span>图片：</span>
      <div class="photo" @click="addPhoto"><img :src="source" /></div>
      <div @click="handleClick" class="bgimg">发布</div>
    </div>
    <i-toast id="toast" />
    </div>
</template>
<script>
/* eslint-disable */
import { $Toast } from '../../static/dist/base/index'
const COS = require('cos-wx-sdk-v5')
const Bucket = 'wjxcloud-1258315462'
const Region = 'ap-guangzhou'
const cos = new COS({
  // ForcePathStyle: true, // 如果使用了很多存储桶，可以通过打开后缀式，减少配置白名单域名数量，请求时会用地域域名
  getAuthorization: function (options, callback) {
    const authorization = COS.getAuthorization({
      SecretId: 'AKID0pRoyuu5JcgVBfhzpQ1azEE7mIZTkduw',
      SecretKey: 'zqV1DAtTs2wb0FFzc09boMgqnZ7g3Seb',
      Method: options.Method,
      Pathname: options.Pathname,
      Query: options.Query,
      Headers: options.Headers,
      Expires: 60
    })
    callback({
      Authorization: authorization
      // XCosSecurityToken: credentials.sessionToken, // 如果使用临时密钥，需要传 XCosSecurityToken
    })
  }
})
export default {
  data () {
    return {
      id: 0,
      imgUrl: 'string',
      bookName: '',
      bookPrice: '',
      belongTo: 0,
      userAva: '',
      source: '',
      belongUsername: ''
    }
  },
  onLoad () {
    this.getSomeUserInfo()
  },
  methods: {
    // 拿到发布者的一些信息,用于点击发布按钮post数据的时候
    getSomeUserInfo () {
      this.$fly.get(`https://www.wjxweb.cn:789/User/all/1?type=wxOpen&value=${this.$store.state.openId}`)
        .then(res => {
          console.log(res)
          this.belongTo = res.data.data[0].id
          this.userAva = res.data.data[0].avatar
          this.belongUsername = res.data.data[0].nickName
        })
        .catch(err => {
          console.log(err)
        })
    },
    addPhoto () {
      const that = this
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original'], // 可以指定是原图还是压缩图，默认用原图
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          const filePath = res.tempFiles[0].path
          const filename = filePath.substr(filePath.lastIndexOf('/') + 1)
          cos.postObject({
            Bucket: Bucket,
            Region: Region,
            Key: filename,
            FilePath: filePath,
            onProgress: function (info) {
              console.log('info', JSON.stringify(info))
              // 这里要完善：上传图片时要显示上传进度
              console.log(JSON.stringify(info.percent))
            }
          }, function (err, data) {
            console.log(err || data)
            const data1 = (err || data)
            that.imgUrl = 'https://' + data1.Location
            console.log('img', that.imgUrl)
            that.source = that.imgUrl
          })
        }
      })
    },
    handleClick () {
      this.$fly.post('https://www.wjxweb.cn:789/TwoHandsBook?', {
        id: this.id,
        bookName: this.bookName,
        bookPrice: this.bookPrice,
        imgUrl: this.imgUrl,
        date: new Date(),
        isSaled: false,
        belongTo: this.belongTo,
        saleTo: 'string',
        userAva:this.userAva,
        belongUsername: this.belongUsername
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
      $Toast({
        content: '发布成功',
        type: 'success'
      })
    }
  }
}
</script>
<style scoped>
.top{
  margin-bottom: 50rpx
}
h2 {
  text-align: center
}
.each{
  margin-bottom: 25rpx;
  position: relative;
}
input{
  float:right;
  width:637rpx
}
.photo{
  width: 300rpx;
  height: 300rpx;
  position: absolute;
  left: 120rpx;
  margin-top: -40rpx;
  background-color: lightgray
}
img{
  width: 300rpx;
  height: 300rpx;
}
.bgimg{
  width: 150rpx;
  height: 150rpx;
  position: absolute;
  left: 550rpx;
  top:160rpx;
  background-image: url("../../static/images/notebook.svg");
  background-size: 150rpx;
  text-align: center;
  line-height: 150rpx;
  font-size: 50rpx;
  font-style: oblique
}
</style>


