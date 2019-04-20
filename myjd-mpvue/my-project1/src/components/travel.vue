<template>
    <div>
    <div id="top">
        <h2>旅游类</h2>
    </div>
    <i-panel title="基础用法">
        <i-input type="textarea" title="旅游大致地点：" autofocus placeholder="请输入地点" maxlength="50"/>
        <i-input type="text" title="旅游大致时间：" placeholder="请输入时间" />
        <!-- <i-input type="text" title="工资：" placeholder="请输入工资"  /> -->
    </i-panel>
    <i-button @click="handleClick" type="primary" shape="circle">发布</i-button>
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


