/*
* @Author: Chen
* @Date:   2020-01-06 10:23:40
* @Last Modified by:   Chen
* @Last Modified time: 2020-01-07 15:20:49
*/
//统一整合store
import Vue from 'vue'
import Vuex from 'vuex'

import home from 'pages/home/store'


Vue.use(Vuex)

export default new Vuex.Store({
	modules:{
        home:home
    }
})