<template>
    <div>
    <div class="top">
        <h2>拼单类</h2>
    </div>
    <div class="each">
      <span>拼单详情：</span>
      <input type="textarea" v-model="detail" placeholder="请输入拼单详情"/>
    </div>
    <!-- <i-panel title="基础用法"> -->
        <!-- <i-input type="textarea" title="拼单详情：" autofocus placeholder="请输入拼单详情" maxlength="50"/> -->
        <!-- <i-input type="text" title="工作其他细节：" placeholder="请输入工作其他细节" /> -->
        <!-- <i-input type="text" title="工资：" placeholder="请输入工资"  /> -->
    <!-- </i-panel> -->
    <i-button @click="handleClick" type="primary" shape="circle">发布</i-button>
    <i-toast id="toast"/>
    </div>
</template>
<script>
import { $Toast } from '../../static/dist/base/index'
export default {
  data () {
    return {

    }
  },
  methods: {
    handleClick () {
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
    margin-bottom: 50rpx
}
input{
  float:right;
  width:563rpx
}
</style>


