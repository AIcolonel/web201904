/*
* @Author: Chen
* @Date:   2020-01-06 10:23:40
* @Last Modified by:   Chen
* @Last Modified time: 2020-01-06 10:25:46
*/
//统一整合store
import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions.js'
import mutations from './mutations.js'
import state from './state.js'
import getters from './getters.js'

Vue.use(Vuex)

export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})