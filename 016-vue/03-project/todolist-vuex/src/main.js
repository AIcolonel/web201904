import Vue from 'vue'
import App from './App.vue'

//将store引入顶层组件
import store from './store/index.js'
Vue.config.productionTip = false

new Vue({
	store,
  	render: h => h(App),
}).$mount('#app')
