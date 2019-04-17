<template>
    <div>
    <div id="top">
        <h2>兼职类</h2>
    </div>
    <i-panel title="基础用法">
        <i-input type="textarea" title="工作类型：" autofocus placeholder="请输入工作类型" maxlength="50"/>
        <i-input type="text" title="工作其他细节：" placeholder="请输入工作其他细节" />
        <i-input type="text" title="工资：" placeholder="请输入工资"  />
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


