<template>
    <div>
    <div id="top">
        <h2>闲置物转出</h2>
    </div>
    <i-panel title="基础用法">
        <i-input type="textarea" title="闲置物详情：" autofocus placeholder="请输入闲置物详情" maxlength="50"/>
        <!-- <i-input type="text" title="工作其他细节：" placeholder="请输入工作其他细节" /> -->
        <i-input type="text" title="价格：" placeholder="请输入价格"  />
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


