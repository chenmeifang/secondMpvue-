<template>
  <div>
    <div class="top">
      <!-- <canvas id="can" width="750px" height="150px"></canvas> -->
      <!-- <img src="/static/images/top.png" class="image"/> -->
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
    <i-grid-item @click="toShareBillPage">
        <i-grid-icon>
            <image src="/static/images/shareTheBill.png" />
        </i-grid-icon>
        <i-grid-label>拼单类</i-grid-label>
    </i-grid-item>
    </i-grid>
    <i-grid>
    <i-grid-item  @click="toIdleItemPage">
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
    <i-grid-item  @click="toTravelPage">
        <i-grid-icon>
            <image src="/static/images/travel.png" />
        </i-grid-icon>
        <i-grid-label>旅游类</i-grid-label>
    </i-grid-item>
    <i-grid-item  @click="toTechnologyPage">
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
    <i-grid-item  @click="toCompetitionPage">
        <i-grid-icon>
            <image src="/static/images/competition.png" />
        </i-grid-icon>
        <i-grid-label>竞赛组队</i-grid-label>
    </i-grid-item>
    <i-grid-item  @click="toResourcePage">
        <i-grid-icon>
            <image src="/static/images/resource.png" />
        </i-grid-icon>
        <i-grid-label>资源需求</i-grid-label>
    </i-grid-item>
    <i-grid-item  @click="toOthersPage">
        <i-grid-icon>
            <image src="/static/images/others.png" />
        </i-grid-icon>
        <i-grid-label>其他</i-grid-label>
    </i-grid-item>
    </i-grid>
  </div>
</template>

<script>
export default {
  data () {

  },
  components: {
  },

  methods: {
    toTutorPage () {
      wx.navigateTo({
        url: 'tutor/main'
      })
    },
    toUsedBookPage () {
      wx.navigateTo({
        url: 'usedBook/main'
      })
    },
    toShareBillPage () {
      wx.navigateTo({
        url: 'shareBill/main'
      })
    },
    toIdleItemPage () {
      wx.navigateTo({
        url: 'idleItem/main'
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
    },
    toTravelPage () {
      wx.navigateTo({
        url: 'travel/main'
      })
    },
    toTechnologyPage () {
      wx.navigateTo({
        url: 'technology/main'
      })
    },
    toExpressPage () {
      wx.navigateTo({
        url: 'express/main'
      })
    },
    toCompetitionPage () {
      wx.navigateTo({
        url: 'competition/main'
      })
    },
    toResourcePage () {
      wx.navigateTo({
        url: 'resource/main'
      })
    },
    toOthersPage () {
      wx.navigateTo({
        url: 'others/main'
      })
    }
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style scoped>
/* .image {
width:750px;
height:150px;
display:inline-block;
overflow:hidden;
} */
.top {
width:750px;
height:150px;
display:inline-block;
overflow:hidden;
/* background-color: aqua */
}
.can{
  background-color:blue
}
</style>
