<template>
    <div>
    <div id="top">
        <h2>二手书类</h2>
    </div>
    <i-panel title="基础用法">
        <i-input type="textarea" title="书名：" autofocus placeholder="请输入书名" maxlength="50"/>
        <i-input type="text" title="书价：" placeholder="请输入价格"  />
    </i-panel>
    <div>
        <div class="extra"><p>图片:</p></div>
        <div class="photo" @click="addphoto"></div>
    </div>
    <i-button @click="handleClick" type="success" shape="circle">发布</i-button>
    </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    addphoto () {
      wx.chooseImage({
        count: 1,
        sourceType: ['album', 'camera']
      })
      console.log('添加图片')
    }
  }
}
</script>
<style scoped>
h2 {
  text-align: center
}
.extra{
    /* display:inline-block; */
    /* float:left; */
    margin-left:35rpx
}
p{
    display: inline;
    font-size: 29rpx
}
.photo{
    width: 120px;
    height: 120px;
    background-color: lightblue;
    margin-left: 190rpx;
    margin-bottom: 30rpx
    /* margin: 0 auto; */
    /* float: left */
}
</style>


