// 入口文件！！！！
import Vue from 'vue'
import App from './App'
import '../weui.css'
import Fly from 'flyio/dist/npm/wx'
import store from './vuex/store'

Vue.prototype.$store = store
const fly = new Fly()
Vue.prototype.$fly = fly
Vue.config.productionTip = false // 关闭提示
App.mpType = 'app' // 声明当前组件的类型是应用
// 这里的‘app’指的是我们的整个应用 声明当前App代表的是整个应用，而不是一个单纯的组件
const app = new Vue(App) // 生成应用的实例
/*
new Vue({
    el: '#app',
})
在mpvue里面不能这样写
*/
app.$mount()
// 挂载整个应用
