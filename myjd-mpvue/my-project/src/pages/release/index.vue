<template>
  <div>
  <i-button @click="showAllClick">选择需求类型</i-button>
  <i-action-sheet :visible="visible1" :actions="actions1" show-cancel @cancle="showNoClick"/>
  <i-panel title="基础用法">
    <i-input type="textarea" title="课程详情" autofocus placeholder="请输入课程详情(最多50字)" maxlength="50"/>
    <i-input type="text" title="上课地点" placeholder="请输入上课地点" />
    <i-input type="text" title="上课薪资" placeholder="请输入薪资"  />
  </i-panel>
  <i-button @click="handleClick" type="success" shape="circle">发布</i-button>  
  </div>
</template>

<script>
  export default {
    name: 'index.vue',
    data () {
      return {
        visible1: false,
        actions1: [
          {
            name: '代拿快递'
          },
          {
            name: '学习类'
          },
          {
            name: '拼单类'
          },
          {
            name: '闲置物转出'
          },
          {
            name: '兼职类'
          },
          {
            name: '租房及转租'
          },
          {
            name: '旅游类'
          },
          {
            name: '家教类'
          },
          /* {
            name: '竞赛组队'
          },
          {
            name: '资源需求'
          }, */
          {
            name: '其他'
          }
        ]
      }
    },
    methods: {
      showAllClick () {
        this.visible1 = true
      },
      showNoClick () {
        this.visible1 = false
      }
      /* showNoClick () {
        this.setData({
          visible1: false
        })
      } */
    }
  }
</script>

<style scoped>
.releaseInfo {
  font-size: 22px;
}
</style>
