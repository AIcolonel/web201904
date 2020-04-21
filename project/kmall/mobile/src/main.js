/*
* @Author: Chen
* @Date:   2020-01-03 10:49:39
* @Last Modified by:   Chen
* @Last Modified time: 2020-01-08 10:22:17
*/

import Vue from 'vue'
import App from './App.vue'

//加载全局公共css样式
import './assets/css/common.css'
//加载全局组件
import './plugins/vant'
//注册全局过滤器
import filters from './filters'
Object.keys(filters).forEach(key=>Vue.filter(key,filters[key]))

Vue.config.productionTip = false
import store from './store'
import router from './router'

new Vue({
	router,
	store,
  	render: h => h(App),
}).$mount('#app')