<template>
  <div>
    <i-notice-bar icon="remind" color="#6495ED" backgroundcolor="#FFFFFF" loop>
      请在下方选择需求类型！！
    </i-notice-bar>
  <router-view>
    <tutor v-if="zero"></tutor>
    <usedBook v-if="one"></usedBook>
    <shareBill v-if="two"></shareBill>
    <idleItem v-if="three"></idleItem>
    <partTimeJob v-if="four"></partTimeJob>
    <renting v-if="five"></renting>
    <technology v-if="six"></technology>
    <express v-if="seven"></express>
    <resource v-if="eight"></resource>
    <others v-if="nine"></others>
  </router-view>
  <view>
  <picker-view @change="showDiff" indicator-style="height: 50px;" class="allList">
    <picker-view-column>
      <view  class="choiceList">家教类</view>
      <view  class="choiceList">二手书类</view>
      <view  class="choiceList">拼单类</view>
      <view  class="choiceList">闲置物转出</view>
      <view  class="choiceList">兼职类</view>
      <view  class="choiceList">租房及转租</view>
      <view  class="choiceList">技术处理类</view>
      <view  class="choiceList">代拿快递</view>
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
import shareBill from '@/components/shareBill'
import idleItem from '@/components/idleItem'
import partTimeJob from '@/components/partTimeJob'
import renting from '@/components/renting'
import technology from '@/components/technology'
import express from '@/components/express'
import resource from '@/components/resource'
import others from '@/components/others'

export default {
  components: {tutor, usedBook, shareBill, idleItem, partTimeJob, renting, technology, express, resource, others},
  name: 'index.vue',
  data () {
    return {
      zero: true,
      one: false,
      two: false,
      three: false,
      four: false,
      five: false,
      six: false,
      seven: false,
      eight: false,
      nine: false,
      choice: 13
    }
  },
  onShow () {
    this.$store.commit('judgeNewUser')
  },
  methods: {
    showDiff (choiceList) {
      this.choice = choiceList.mp.detail.value[0]
    }
  },
  updated () {
    if (this.choice === 0) {
      this.zero = true
      this.one = false
      this.two = false
      this.three = false
      this.four = false
      this.five = false
      this.six = false
      this.seven = false
      this.eight = false
      this.nine = false
      this.ten = false
      this.eleven = false
    }
    if (this.choice === 1) {
      this.zero = false
      this.one = true
      this.two = false
      this.three = false
      this.four = false
      this.five = false
      this.six = false
      this.seven = false
      this.eight = false
      this.nine = false
      this.ten = false
      this.eleven = false
    }
    if (this.choice === 2) {
      this.zero = false
      this.one = false
      this.two = true
      this.three = false
      this.four = false
      this.five = false
      this.six = false
      this.seven = false
      this.eight = false
      this.nine = false
      this.ten = false
      this.eleven = false
    }
    if (this.choice === 3) {
      this.zero = false
      this.one = false
      this.two = false
      this.three = true
      this.four = false
      this.five = false
      this.six = false
      this.seven = false
      this.eight = false
      this.nine = false
      this.ten = false
      this.eleven = false
    }
    if (this.choice === 4) {
      this.zero = false
      this.one = false
      this.two = false
      this.three = false
      this.four = true
      this.five = false
      this.six = false
      this.seven = false
      this.eight = false
      this.nine = false
      this.ten = false
      this.eleven = false
    }
    if (this.choice === 5) {
      this.zero = false
      this.one = false
      this.two = false
      this.three = false
      this.four = false
      this.five = true
      this.six = false
      this.seven = false
      this.eight = false
      this.nine = false
      this.ten = false
      this.eleven = false
    }
    if (this.choice === 6) {
      this.zero = false
      this.one = false
      this.two = false
      this.three = false
      this.four = false
      this.five = false
      this.six = true
      this.seven = false
      this.eight = false
      this.nine = false
      this.ten = false
      this.eleven = false
    }
    if (this.choice === 7) {
      this.zero = false
      this.one = false
      this.two = false
      this.three = false
      this.four = false
      this.five = false
      this.six = false
      this.seven = true
      this.eight = false
      this.nine = false
      this.ten = false
      this.eleven = false
    }
    if (this.choice === 8) {
      this.zero = false
      this.one = false
      this.two = false
      this.three = false
      this.four = false
      this.five = false
      this.six = false
      this.seven = false
      this.eight = true
      this.nine = false
      this.ten = false
      this.eleven = false
    }
    if (this.choice === 9) {
      this.zero = false
      this.one = false
      this.two = false
      this.three = false
      this.four = false
      this.five = false
      this.six = false
      this.seven = false
      this.eight = false
      this.nine = true
      this.ten = false
      this.eleven = false
    }
  }
}
</script>

<style scoped>
.releaseInfo {
  font-size: 22px;
}
.allList{
  width: 100%; 
  height: 350rpx;
  position:fixed;
  bottom: 0px
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
