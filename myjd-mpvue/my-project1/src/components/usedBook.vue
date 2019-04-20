<template>
    <div>
    <div id="top">
        <h2>二手书类</h2>
    </div>
    <i-panel title="基础用法">
        <i-input type="textarea" title="书名：" autofocus placeholder="请输入书名" maxlength="50"/>
        <!-- <i-input type="text" title="上课地点：" placeholder="请输入上课地点" /> -->
        <i-input type="text" title="书价：" placeholder="请输入价格"  />
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


