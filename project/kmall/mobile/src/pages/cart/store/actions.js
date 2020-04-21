/*
* @Author: Chen
* @Date:   2020-01-06 10:21:04
* @Last Modified by:   Chen
* @Last Modified time: 2020-01-06 15:34:13
*/
//组件中用由this.$store.dispatch方法来派发action,
//action中用commit来提交mutation
//action中可以包含异步操作
import { ADD_TODO,DEL_TODO,SELECT_ALL_TODO,DELETE_ALL_DONE } from './types.js'
export default {
	[ADD_TODO]({commit},todo){
		commit(ADD_TODO,todo)
	},
	[DEL_TODO]({commit},index){
		commit(DEL_TODO,index)
	},
	[SELECT_ALL_TODO]({commit},value){
		commit(SELECT_ALL_TODO,value)
	},
	[DELETE_ALL_DONE]({commit}){
		commit(DELETE_ALL_DONE)
	},
}