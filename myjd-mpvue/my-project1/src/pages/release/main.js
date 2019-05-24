import Vue from 'vue'
import App from './index'
// 这个App指的是这个组件

const app = new Vue(App)
app.$mount()
// 挂载当前页面，而不是整个应用

export default {
  config: {
    usingComponents: {
      'i-button': '../../static/dist/button/index'
    }
  }
}
