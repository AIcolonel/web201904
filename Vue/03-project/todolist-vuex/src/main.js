/*
* @Author: Chen
* @Date:   2020-01-03 10:49:39
* @Last Modified by:   Chen
* @Last Modified time: 2020-01-06 10:26:23
*/

import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import store from './store'

new Vue({
	store,
  	render: h => h(App),
}).$mount('#app')