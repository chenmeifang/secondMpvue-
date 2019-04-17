<template>
    <div>
    <div id="top">
        <h2>租房及转租</h2>
    </div>
    <i-panel title="基础用法">
        <i-input type="textarea" title="房子细节：" autofocus placeholder="请输入房子细节" maxlength="50"/>
        <!-- <i-input type="text" title="工作其他细节：" placeholder="请输入工作其他细节" /> -->
        <i-input type="text" title="房租详情：" placeholder="请输入房租详情"  />
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


