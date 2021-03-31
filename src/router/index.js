import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
//状态管理
import store from '../store'
//导入axios
import axios from 'axios'
/*
路由懒加载
 */
const lazyLoad = (path) => () => import(`@/components${path}`)
// const lazyLoad = (path) => () => import(`@/components${path}`)

const Home = lazyLoad('/Home/home')                    // 首页
const Swiper = lazyLoad('/Swiper/swiper')              // 轮播图
const Slider_nav = lazyLoad('/Slider_nav/slider_nav')  // 分页导航
const Password = lazyLoad('/Password/password')        // 密码输入框
const Left_right = lazyLoad('/Left_right/left_right')  // 左右联动
const Picture = lazyLoad('/Picture/picture')           // 图片上传
const Slider_body = lazyLoad('/Slider_body/slider_body')//body左右滑动 
const Jsonp_swiper = lazyLoad('/Jsonp_swiper/jsonp_swiper')//跨域请求 抓取信息
const Singer_list = lazyLoad('/Singer_list/singer_list')// g歌手列表
const Swiper2 = lazyLoad('/Swiper2/index')              // 轮播图
const Login =lazyLoad('/Login/login')                   // 登陆
const Getnumbet =lazyLoad('/Login/getnumber')           // 登陆
const Vuex_demo =lazyLoad('/Vuex_demo/vuex_demo')        // vue demo 演示
const Vue_baidu_map =lazyLoad('/Vue_baidu_map/vue_baidu_map') // 百度地图demo
const Citychoose =lazyLoad('/Citychoose/citychoose')     // 城市选择
Vue.use(Router)  
const router = new Router({
	mode: 'hash',
	routes: [{
		path: '/',
		component: Main,
		children: [{
				path: '',
				redirect: '/home'
      },
      {
				path: '/home',
				name: '首页',
				component: Home,
      },
      {
				path: '/swiper',
				name: '轮播图',
				component: Swiper,
      },
      {
				path: '/slider_nav',
				name: '分页导航',
				component: Slider_nav,
      },
      {
				path: '/password',
				name: '密码输入框',
				component: Password,
      },
      {
				path: '/left_right',
				name: '左右联动',
				component: Left_right,
      },
      {
				path: '/picture',
				name: '图片上传',
				component: Picture,
      },
      {
        path: '/slider_body',
				name: 'body滑动',
        component:Slider_body
      },
      {
        path: '/jonsp_swiper',
				name: '跨域请求',
        component:Jsonp_swiper
      },
      {
        path: '/singer_list',
				name: '歌手列表',
        component:Singer_list
      },
      {
				path: '/swiper2',
				name: '轮播图2',
				component: Swiper2,
      },
      {
				path: '/login',
				name: '登陆',
				component: Login,
      },
      {
				path: '/getnumber',
				name: '登陆',
				component: Getnumbet,
      },
      {
				path: '/vuex_demo',
				name: 'vuex',
				component: Vuex_demo,
      },
      {
				path: '/vue_baidu_map',
				name: '百度地图',
				component: Vue_baidu_map,
      },
      {
				path: '/citychoose',
				name: '城市选择',
				component: Citychoose,
      }
		]
	}]
})
const $http = axios;
const $store = store;
//路由守卫 ,解决token放置,登录处理
router.beforeEach((to, from, next) => {
   // $http.defaults.headers.common['timaToken'] = $store.state.deviceInformation.token; //本地测试使用,生产注掉
   
   // getCookie('init') 获取用户信息,手机设备号
  try {
    if (!$http.defaults.headers.common['timaToken']) {
      let deviceInformation;
      if (isMobile.iOS()) {
         deviceInformation = JSON.parse(getCookie('init'))
      } else {
        deviceInformation = JSON.parse(js2android.init());
      }
       if (deviceInformation) {
        
       }
    }
    next()
  } catch (err) {
    next()
  }
})
export default router;
