import App from './App'
import store from './store'
import { router, RouterMount } from './router/index.js'
import uView from '@/uni_modules/uview-ui'
import $http from '@/uni_modules/zhouWei-request/js_sdk/requestConfig';

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$store = store
Vue.use(router)
Vue.use(uView)
// 如此配置即可
uni.$u.config.unit = 'rpx'
Vue.prototype.$http = $http;

const app = new Vue({
	...App
})

//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
RouterMount(app, router, '#app')
// #endif

// #ifndef H5
app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
// #endif


// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
