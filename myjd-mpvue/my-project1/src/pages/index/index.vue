<template>
  <div>
    <div class="top">
      <!-- <canvas id="can" width="750px" height="150px" ref="myCanvas"></canvas> -->
      <!-- <canvas style="width: 1500rpx; height: 300rpx;" canvas-id="firstCanvas" ref="myCanvas"></canvas> -->
      <img src="/static/images/header.png"/>
      <!-- 温馨提示：请先跳转至“我的”页面点击认证 -->
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
    <!-- <i-grid-item  @click="toTravelPage">
        <i-grid-icon>
            <image src="/static/images/travel.png" />
        </i-grid-icon>
        <i-grid-label>旅游类</i-grid-label>
    </i-grid-item> -->
    <i-grid-item @click="toRentingPage">
        <i-grid-icon>
            <image src="/static/images/renting.png" />
        </i-grid-icon>
        <i-grid-label>租房及转租</i-grid-label>
    </i-grid-item>
    </i-grid>
    <i-grid>
    <i-grid-item  @click="toResourcePage">
        <i-grid-icon>
            <image src="/static/images/resource.png" />
        </i-grid-icon>
        <i-grid-label>资源需求</i-grid-label>
    </i-grid-item>
    <i-grid-item @click="toPartTimeJobPage">
        <i-grid-icon>
            <image src="/static/images/partTimeJob.png" />
        </i-grid-icon>
        <i-grid-label>兼职类</i-grid-label>
    </i-grid-item>
    <i-grid-item @click="toExpressPage">
        <i-grid-icon>
            <image src="/static/images/parcle.png" />
        </i-grid-icon>
        <i-grid-label>代拿快递</i-grid-label>
    </i-grid-item>
    </i-grid>
    <i-grid>
    <!-- <i-grid-item  @click="toCompetitionPage">
        <i-grid-icon>
            <image src="/static/images/competition.png" />
        </i-grid-icon>
        <i-grid-label>竞赛组队</i-grid-label>
    </i-grid-item> -->
    <i-grid-item  @click="toTechnologyPage">
        <i-grid-icon>
            <image src="/static/images/technology.png" />
        </i-grid-icon>
        <i-grid-label>技术处理类</i-grid-label>
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
    return {
      // ctx: {}
    }
  },
  components: {
  },
  onReady () {
    console.log('aaaaaaa')
    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
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
  mounted () {
    /* const context = wx.createCanvasContext('firstCanvas')
    context.beginPath()
    context.arc(100, 100, 10, 0, 2 * Math.PI, false)
    context.stroke()
    context.draw() */
    // var canvas = document.getElementById('can')
    // var canvas = this.$refs.myCanvas
    /*  const canvas = this.$refs.maCanvas
    var ctx = canvas.getContext('2d') */
    // const ctx = wx.createCanvasContext(canvas)
    /* var arr = []
    setInterval(function () {
      var x = Math.random() * canvas.width
      var y = Math.random() * canvas.height
      var r = 10
      var red = Math.floor(Math.random() * 255)
      var green = Math.floor(Math.random() * 255)
      var blue = Math.floor(Math.random() * 255)
      var alpha = 1
      arr.push({
        circleX: x,
        circleY: y,
        circleR: r,
        circleRed: red,
        circleGreen: green,
        circleBlue: blue,
        circleAlpha: alpha
      })
    }, 60)
    setInterval(function () {
      this.ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (var i = 0; i < arr.length; i++) {
        ctx.beginPath()
        arr[i].circleR += 2.5
        arr[i].circleAlpha -= 0.03
        ctx.fillStyle = `rgba(${arr[i].circleRed},${arr[i].circleGreen},${arr[i].circleBlue},${arr[i].circleAlpha})`
        ctx.arc(arr[i].circleX, arr[i].circleY, arr[i].circleR, 0, 360 * Math.PI / 180, false)
        ctx.closePath()
        ctx.fill()
        ctx.draw()
      }
    }, 60) */
  }
}
</script>

<style scoped>

img{
  width: 320rpx;
  height: 300rpx;
  margin-left: 220rpx;
  /* background-color: darkgray */
  /* background-color: dimgray */
}
.top {
width:750px;
height:300rpx;
/* height: 150px; */
/* display:inline-block; */
/* overflow:hidden; */
/* background-color: blue */
}
</style>
