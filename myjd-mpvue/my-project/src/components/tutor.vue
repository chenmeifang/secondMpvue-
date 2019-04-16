<template>
    <div>
    <div id="top">
        <h2>家教类</h2>
    </div>
    <i-panel title="基础用法">
        <i-input type="textarea" title="课程详情：" autofocus placeholder="请输入课程详情(最多50字)" maxlength="50"/>
        <i-input type="text" title="上课地点：" placeholder="请输入上课地点" />
        <i-input type="text" title="上课薪资：" placeholder="请输入薪资"  />
    </i-panel>
    <i-button @click="handleClick" type="success" shape="circle">发布</i-button>
    </div>
</template>
<script>
export default {
}
</script>
<style scoped>
h2 {
  text-align: center
}
</style>


