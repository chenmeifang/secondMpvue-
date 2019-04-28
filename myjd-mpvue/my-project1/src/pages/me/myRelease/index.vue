<template>
  <div class="whole">
    <div class="header">
      <p>我发布的单子</p>
    </div>
    <div class="body">

    </div>
  </div>
</template>

<script>
  export default {
    name: 'index',
    methods: {
    }
  }
</script>

<style scoped>
  .header {
    text-align: center;
    background-color: #26324b;
    color: white;
  }
  .body {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom right, #fc9c8d, #c5d2ff);
  }
</style>
