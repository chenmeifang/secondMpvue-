<template>
  <div class="whole">
    <div>
      <img src="/static/images/top.png" class="image"/>
    </div>
    <i-grid>
    <i-grid-item @click="toTutorPage">
        <i-grid-icon>
            <image src="/static/images/tutor.png" />
        </i-grid-icon>
        <i-grid-label>家教类</i-grid-label>
    </i-grid-item>
    <i-grid-item @click="toUsedBookPage">
        <i-grid-icon>
            <image src="/static/images/study.png" />
        </i-grid-icon>
        <i-grid-label>二手书类</i-grid-label>
    </i-grid-item>
    <i-grid-item>
        <i-grid-icon>
            <image src="/static/images/shareTheBill.png" />
        </i-grid-icon>
        <i-grid-label>拼单类</i-grid-label>
    </i-grid-item>
    </i-grid>
    <i-grid>
    <i-grid-item>
        <i-grid-icon>
            <image src="/static/images/idle.png" />
        </i-grid-icon>
        <i-grid-label>闲置物转出</i-grid-label>
    </i-grid-item>
    <i-grid-item @click="toPartTimeJobPage">
        <i-grid-icon>
            <image src="/static/images/partTimeJob.png" />
        </i-grid-icon>
        <i-grid-label>兼职类</i-grid-label>
    </i-grid-item>
    <i-grid-item @click="toRentingPage">
        <i-grid-icon>
            <image src="/static/images/renting.png" />
        </i-grid-icon>
        <i-grid-label>租房及转租</i-grid-label>
    </i-grid-item>
    </i-grid>
    <i-grid>
    <i-grid-item>
        <i-grid-icon>
            <image src="/static/images/travel.png" />
        </i-grid-icon>
        <i-grid-label>旅游类</i-grid-label>
    </i-grid-item>
    <i-grid-item>
        <i-grid-icon>
            <image src="/static/images/technology.png" />
        </i-grid-icon>
        <i-grid-label>技术处理类</i-grid-label>
    </i-grid-item>
    <i-grid-item @click="toExpressPage">
        <i-grid-icon>
            <image src="/static/images/parcle.png" />
        </i-grid-icon>
        <i-grid-label>代拿快递</i-grid-label>
    </i-grid-item>
    </i-grid>
    <i-grid>
    <i-grid-item>
        <i-grid-icon>
            <image src="/static/images/competition.png" />
        </i-grid-icon>
        <i-grid-label>竞赛组队</i-grid-label>
    </i-grid-item>
    <i-grid-item>
        <i-grid-icon>
            <image src="/static/images/resource.png" />
        </i-grid-icon>
        <i-grid-label>资源需求</i-grid-label>
    </i-grid-item>
    <i-grid-item>
        <i-grid-icon>
            <image src="/static/images/others.png" />
        </i-grid-icon>
        <i-grid-label>其他</i-grid-label>
    </i-grid-item>
    </i-grid>
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
    toUsedBookPage () {
      wx.navigateTo({
        url: 'usedBook/main'
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
    },
    toRentingPage () {
      wx.navigateTo({
        url: 'renting/main'
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
