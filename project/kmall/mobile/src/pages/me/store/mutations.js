/*
* @Author: Chen
* @Date:   2020-01-06 10:21:56
* @Last Modified by:   Chen
* @Last Modified time: 2020-01-06 15:34:56
*/
//唯一更改state的方法
//mutation必须是同步函数
//在mutation中更改state数据
import { ADD_TODO,DEL_TODO,SELECT_ALL_TODO,DELETE_ALL_DONE } from './types.js'
export default {
	[ADD_TODO](state,todo){
		state.todos.unshift(todo)
	},
	[DEL_TODO](state,index){
		state.todos.splice(index,1)
	},
	[SELECT_ALL_TODO](state,value){
		state.todos.forEach((item)=>{
			item.done = value
		})
	},
	[DELETE_ALL_DONE](state){
		state.todos = state.todos.filter(item=>item.done != true)
	},
}