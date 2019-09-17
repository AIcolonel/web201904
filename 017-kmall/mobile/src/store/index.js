//store的出口文件
import Vue from 'vue'
import Vuex from 'vuex'


import home from '../pages/home/store/index.js'

//生成store
Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
	    home:home,
	}
})