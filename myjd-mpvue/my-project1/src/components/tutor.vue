<template>
    <div>
    <div id="top">
        <h2>家教类</h2>
    </div>
    <i-panel title="基础用法">
        <i-input :value="detail" type="textarea" title="课程详情：" autofocus placeholder="请输入课程详情(最多50字)" maxlength="50"/>
        <i-input :value="workPlace" type="textarea" title="上课地点："  placeholder="请输入上课地点" />
        <i-input :value="salary" type="textarea" title="上课薪资："  placeholder="请输入薪资"  />
        <!-- <i-input v-model="detail" type="textarea" title="课程详情：" autofocus placeholder="请输入课程详情(最多50字)" maxlength="50"/>
        <i-input v-model="workPlace" type="textarea" title="上课地点："  placeholder="请输入上课地点" />
        <i-input v-model="salary" type="textarea" title="上课薪资："  placeholder="请输入薪资"  /> -->
    </i-panel>
    <i-button @click="handleClick" type="primary" shape="circle">发布</i-button>
    </div>
</template>
<script>
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
        .then(result => {
          console.log('啦啦啦啦啦啦啦')
          console.log(result)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style scoped>
h2 {
  text-align: center
}
</style>


