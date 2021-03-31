import axios from 'axios';
import { Indicator, MessageBox } from 'mint-ui';

let needLoadingRequestCount = 0; //请求次数
function startLoading() {
	Indicator.open({
	  text: '加载中...',
	  spinnerType: 'fading-circle',
	});
}
function endLoading() {
	Indicator.close();
}
// 显示mint-ui loading
function showFullScreenLoading () { 
    if (needLoadingRequestCount === 0) {
        startLoading();
    }
    needLoadingRequestCount++;
}
// 隐藏mint-ui loading
function tryHideFullScreenLoading () {
    if (needLoadingRequestCount <= 0) return;
        needLoadingRequestCount--;
    if (needLoadingRequestCount === 0) {
       endLoading()
    }
}
// 请求拦截
axios.interceptors.request.use( req => {
		showFullScreenLoading();
        return req
	},
	error => {
		tryHideFullScreenLoading() //所有请求都出错时,结束加载动画
		return Promise.reject(error)
	}
)
// 响应拦截
axios.interceptors.response.use(
	res => {
         if (res.data.code === 403) {// 登录失效，清除token，返回主页
			if (isMobile.iOS()) {
				 window.webkit.messageHandlers.logoutAction.postMessage({}) //微信登录成功返回原生页面,本地调试要注销掉,否则走不下去
			} else {
				js2android.logOut(); //微信登录成功返回原生页面,本地调试要注销掉,否则走不下去
			}
         }
		tryHideFullScreenLoading() //结束加载动画
		return res
	},
	error => {
		let {data} = error.response.data
		tryHideFullScreenLoading() //结束加载动画
		MessageBox.error(data.error)
		return Promise.reject(error)
	}
)
export default axios
