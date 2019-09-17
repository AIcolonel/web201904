//store的出口文件
import Vue from 'vue'
import Vuex from 'vuex'


import actions from './actions.js'
import state from './state.js'
import mutations from './mutations.js'
import getters from './getters.js'

//生成store
Vue.use(Vuex)

export default new Vuex.Store({
	actions,
	state,
	mutations,
	getters
})