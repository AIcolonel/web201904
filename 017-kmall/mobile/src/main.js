import Vue from 'vue'
import App from './App.vue'

//引入公共css
import './assets/css/common.css'

//引入路由
import router from './router/index.js'

//引入vant(UI)组件
import './plugins/vant/index.js'

//引入过滤器
import filters from './filters/index.js'
//这种方法是将所有的过滤器抽取到一个文件中(容易管理)
Object.keys(filters).forEach(key=>Vue.filter(key,filters[key]));

/*
//这种方法是一个过滤器注册一次(方便阅读)
// 注册一个全局自定义过滤器
// toFixed方法保留两位小数
Vue.filter('formatPrice',(price=0)=> {
	return '$'+parseFloat(price).toFixed(2);
})
*/

//将store引入顶层组件
import store from './store/index.js'
Vue.config.productionTip = false

new Vue({
	store,
	router,
  	render: h => h(App),
}).$mount('#app')
