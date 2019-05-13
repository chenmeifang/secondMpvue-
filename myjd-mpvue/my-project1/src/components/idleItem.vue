<template>
    <div>
    <div class="title">
        <p>闲置物转出</p>
    </div>
    <div class="each">
      <span>闲置物详情：</span>
      <input type="textarea" v-model="name" placeholder="请输入闲置物详情"/>
    </div>
    <div class="each">
      <span>价格：</span>
      <input type="textarea" v-model="price" placeholder="请输入价格"/>
    </div>
    <div class="each second">
      <span>图片：</span>
      <div class="photo" @click="addPhoto"><img :src="source" /></div>
    </div>
    <i-button class="btn" @click="handleClick" type="primary" shape="circle">发布</i-button>
    <i-toast id="toast"/>
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
      name: '',
      price: '',
      belongTo: 0,
      source: '',
      filePath: '',
      userAva: ''
    }
  },
  onLoad () {
    console.log(this.$store.state.openId)
    this.$fly.get(`https://www.wjxweb.cn:789/User/all/1?type=wxOpen&value=${this.$store.state.openId}`)
      .then(res => {
        console.log(res)
        this.belongTo = res.data.data[0].id
        this.userAva = res.data.data[0].avatar
        console.log('啊啊啊啊')
        console.log(this.userAva)
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    handleClick () {
      this.$fly.post('https://www.wjxweb.cn:789/setAsideGoods', {
        id: 0,
        belongTo: this.belongTo,
        name: this.name,
        price: this.price,
        imgUrl: this.source,
        date: new Date(),
        saleTo: 'string',
        isSaled: false,
        userAva: this.userAva
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
      $Toast({
        content: '发布成功',
        type: 'success'
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
    }
  }
}
</script>
<style scoped>
.title{
    margin-bottom: 25rpx
}
p{
  text-align: center
}
.each{
    margin-bottom: 25rpx
}
.second{
  margin-bottom: 290rpx
}
input{
  float:right;
  width:525rpx
}
.photo{
  width: 300rpx;
  height: 300rpx;
  float: right;
  margin-right: 220rpx;
  margin-top: 20rpx;
  background-color: lightgray
}
img{
  width: 300rpx;
  height: 300rpx;
}
</style>