<template>
    <div>
    <div class="top">
        <h2>家教类</h2>
    </div>
    <!-- <i-panel title="基础用法"> -->
        <!-- <i-input :value="detail" type="textarea" title="课程详情：" autofocus placeholder="请输入课程详情(最多50字)" maxlength="50"/> -->
        <!-- <i-input :value="workPlace" type="textarea" title="上课地点："  placeholder="请输入上课地点" /> -->
        <!-- <i-input :value="salary" type="textarea" title="上课薪资："  placeholder="请输入薪资"  /> -->
        <!-- <i-input v-model="detail" type="textarea" title="课程详情：" autofocus placeholder="请输入课程详情(最多50字)" maxlength="50"/>
        <i-input v-model="workPlace" type="textarea" title="上课地点："  placeholder="请输入上课地点" />
        <i-input v-model="salary" type="textarea" title="上课薪资："  placeholder="请输入薪资"  /> -->
    <!-- </i-panel> -->
    <div class="each">
      <span>课程详情：</span>
      <input type="textarea" v-model="detail" placeholder="请输入授课对象年级及学科等信息"/>
    </div>
    <div class="each">
      <span>上课地点：</span>
      <input type="textarea" v-model="workPlace" placeholder="请输入授课地点"/>
    </div>
    <div class="each">
      <span>授课薪水：</span>
      <input type="textarea" v-model="salary" placeholder="请输入上课报酬"/>
    </div>
    <i-button @click="handleClick" type="primary" shape="circle">发布</i-button>
    <i-toast id="toast" />
    </div>
</template>
<script>
import { $Toast } from '../../static/dist/base/index'
export default {
  data () {
    return {
      date: null,
      detail: '',
      id: 0,
      isFind: true,
      salary: '',
      serviceMan: 'string',
      workPlace: ''
    }
  },
  methods: {
    handleClick () {
      this.$fly.post('https://www.wjxweb.cn:789/Tutor', {
        'date': new Date(),
        'detail': this.detail,
        'id': 0,
        'isFind': 0,
        'salary': this.salary,
        'serviceMan': null,
        'workPlace': this.workPlace
      })
        .then(res => {
          // console.log('啦啦啦啦啦啦啦')
          // console.log(this.workPlace)
          console.log(res)
        })
        .catch(err => {
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
    margin-bottom: 50rpx
}
input{
  float:right;
  width:563rpx
}
</style>


