<template>
    <div>
    <div id="top">
        <h2>快递类</h2>
    </div>
    <i-panel title="基础用法">
        <i-input type="textarea" title="快递位置：" autofocus placeholder="请输入快递位置" maxlength="50"/>
        <!-- <i-input type="text" title="快递单号：" placeholder="为避免有人恶意拿包裹，快递单号" /> -->
        <i-input type="text" title="跑腿费：" placeholder="请输入跑腿费"  />
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


