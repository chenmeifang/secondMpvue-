<template>
  <div>
    <i-notice-bar icon="remind">
      请在下方先选择将发布需求所属的类型！！
    </i-notice-bar>
  <!-- <i-button @click="showAllClick">选择将发布的需求所属的类型</i-button> -->
  <router-view>
    <tutor v-if="zero"></tutor>
    <usedBook v-if="one"></usedBook>
    <partTimeJob v-if="four"></partTimeJob>
  </router-view>
  <view>
  <picker-view @change="showDiff" indicator-style="height: 50px;" style="width: 100%; height: 300px;">
    <picker-view-column>
      <view  class="choiceList">家教类</view>
      <view  class="choiceList">二手书类</view>
      <view  class="choiceList">拼单类</view>
      <view  class="choiceList">闲置物转出</view>
      <view  class="choiceList">兼职类</view>
      <view  class="choiceList">租房及转租</view>
      <view  class="choiceList">旅游类</view>
      <view  class="choiceList">技术处理类</view>
      <view  class="choiceList">代拿快递</view>
      <view  class="choiceList">竞赛组队</view>
      <view  class="choiceList">资源需求</view>
      <view  class="choiceList">其他</view>
    </picker-view-column>
  </picker-view>
  </view>
  </div>
</template>

<script>
import tutor from '@/components/tutor'
import usedBook from '@/components/usedBook'
import partTimeJob from '@/components/partTimeJob'

export default {
  name: 'index.vue',
  data () {
    return {
      zero: false,
      one: false,
      four: false,
      choice: 13
    }
  },
  methods: {
    showDiff (choiceList) {
      console.log(choiceList.mp.detail.value[0])
      this.choice = choiceList.mp.detail.value[0]
      console.log(this.choice)
    }
  },
  components: {tutor, partTimeJob, usedBook},
  updated () {
    if (this.choice === 0) {
      this.zero = true
      this.one = false
      this.four = false
    }
    if (this.choice === 1) {
      this.zero = false
      this.one = true
      this.four = false
    }
    if (this.choice === 4) {
      this.zero = false
      this.one = false
      this.four = true
    }
  }
}
</script>

<style scoped>
.releaseInfo {
  font-size: 22px;
}
.choiceList {
  line-height: 50px; 
  text-align: center
}
.top {
  height: 200rpx;
}
h2 {
  text-align: center
}
</style>
