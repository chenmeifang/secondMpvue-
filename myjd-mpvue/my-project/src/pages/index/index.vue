<template>
  <div class="whole">
    <div>
      <img src="/static/images/top.png" class="image"/>
    </div>
    <div class="weui-grids"  >
      <a class="weui-grid js_grid"  @click="toExpressPage">
        <div class="weui-grid__icon">
          <img src="" alt="">
        </div>
        <p class="weui-grid__label">
          代拿快递
        </p>
      </a>
      <a class="weui-grid js_grid" @click="toTwoHandsBookPage">
        <div class="weui-grid__icon">
          <img src="" alt="">
        </div>
        <p class="weui-grid__label">
          学习类（二手书，竞赛组队等）
        </p>
      </a>
      <a class="weui-grid js_grid" >
        <div class="weui-grid__icon">
          <img src="" alt="">
        </div>
        <p class="weui-grid__label">
          拼单类
        </p>
      </a>
      <a href="javascript:" class="weui-grid js_grid" >
        <div class="weui-grid__icon">
          <img src="" alt="">
        </div>
        <p class="weui-grid__label">
          闲置物转出
        </p>
      </a>
      <a class="weui-grid js_grid" @click="toPartTimeJobPage">
        <div class="weui-grid__icon">
          <img src="" alt="">
        </div>
        <p class="weui-grid__label">
          兼职类
        </p>
      </a>
      <a href="javascript:" class="weui-grid js_grid" >
        <div class="weui-grid__icon">
          <img src="" alt="">
        </div>
        <p class="weui-grid__label">
          租房及转租
        </p>
      </a>
      <a href="javascript:" class="weui-grid js_grid" >
        <div class="weui-grid__icon">
          <img src="" alt="">
        </div>
        <p class="weui-grid__label">
          旅游类
        </p>
      </a>
      <!-- <a href="javascript:" class="weui-grid js_grid" >
        <div class="weui-grid__icon">
          <img src="" alt="">
        </div>
        <p class="weui-grid__label">
          技术处理类
        </p>
      </a> -->
      <a class="weui-grid js_grid" @click="toTutorPage">
        <div class="weui-grid__icon">
          <img src="" alt="">
        </div>
        <p class="weui-grid__label">
          家教类
        </p>
      </a>
      <!-- <a href="javascript:" class="weui-grid js_grid" >
        <div class="weui-grid__icon">
          <img src="" alt="">
        </div>
        <p class="weui-grid__label">
          竞赛组队
        </p>
      </a> -->
      <!-- <a href="javascript:" class="weui-grid js_grid" >
        <div class="weui-grid__icon">
          <img src="" alt="">
        </div>
        <p class="weui-grid__label">
          资源需求
        </p>
      </a> -->
      <a href="javascript:" class="weui-grid js_grid" >
        <div class="weui-grid__icon">
          <img src="" alt="">
        </div>
        <p class="weui-grid__label">
          其他
        </p>
      </a>
    </div>
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  data () {

  },

  components: {
    card
  },

  methods: {
    toExpressPage () {
      wx.navigateTo({
        url: 'express/main'
      })
    },
    toTwoHandsBookPage () {
      wx.navigateTo({
        url: 'twoHandsBook/main'
      })
    },
    toTutorPage () {
      wx.navigateTo({
        url: 'tutor/main'
      })
    },
    toPartTimeJobPage () {
      wx.navigateTo({
        url: 'partTimeJob/main'
      })
    }
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style scoped>
.image {
width:750px;
height:150px;
display:inline-block;
overflow:hidden;
}
</style>
