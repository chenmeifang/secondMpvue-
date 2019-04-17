<template>
    <div>
    <div id="top">
        <h2>技术处理类</h2>
    </div>
    <i-panel title="基础用法">
        <i-input type="textarea" title="技术问题：" autofocus placeholder="请输入技术问题" maxlength="50"/>
        <!-- <i-input type="text" title="工作其他细节：" placeholder="请输入工作其他细节" /> -->
        <i-input type="text" title="报酬：" placeholder="请输入报酬"  />
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


