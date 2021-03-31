// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js' //状态管理


import '../static/style/border.css' //解决移动端一像素问题
import './../static/style/public.css' //公共样式
import './../static/style/reset.css' //样式重置

// import FastClick from 'fastclick' 
// FastClick.attach(document.body); // 解决移动端点击事件300s延迟问题

import BaiduMap from 'vue-baidu-map' //引入百度地图
Vue.use(BaiduMap, {
  ak: 'GRSBfNv296FiLBfRKqLLEGSPwFvWNQ52'    //这个地方是官方提供的ak密钥
})

import axios from '../static/js/http' //导入axios
import md5 from 'js-md5'; //导入md5加密

import $ from 'jquery' //导入jquery

import VueAwesomeSwiper from 'vue-awesome-swiper' //轮播图
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper,)

Vue.prototype.$http = axios;
Vue.prototype.$md5 = md5;

import Mint from'mint-ui'

import'mint-ui/lib/style.css'


/**
 * 为了解决ios页面滚动后 点击事件失效的问题 
 */
let timer = null
window.addEventListener('scroll', () => {
  clearTimeout(timer)
  timer = null
  timer = setTimeout(() => {
    document.body.scrollTop = document.body.scrollTop + 0.000000000001
  }, 300)
}, false)
Vue.use(Mint);
//手机端调试工具,发布提交时必须注释掉
   import Vconsole from 'vconsole'
   let vConsole = new Vconsole();

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
