/*
* @Author: Chen
* @Date:   2019-11-27 16:35:26
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-29 09:35:06
*/
import {
	CHANGE_ITEM,
	ADD_ITEM,
	DEL_ITEM,
	LOAD_DATA
} from './actionTypes.js'

const defaultState = {
	list:["吃饭","睡觉","打游戏","上网"],
	task:''
}

/*
	1.reducer是一个纯函数(有固定的输入就有固定的输出)
	2.reducer需要返回一个newState,不能更改函数参数中的state
	该state由store来进行管理,该state在store中被所有组件共享
	因此store根据reducer返回的newState更改自己的state,在组件中通过getState()
	获取的是store中的state
*/

export default (state=defaultState,action)=>{
	if(action.type == CHANGE_ITEM){
		const newState = JSON.parse(JSON.stringify(state))
		newState.task = action.payload
		return newState
	}
	if(action.type == ADD_ITEM){
		const newState = JSON.parse(JSON.stringify(state))
		newState.list.push(state.task)
		newState.task = ''
		return newState
	}
	if(action.type == DEL_ITEM){
		const newState = JSON.parse(JSON.stringify(state))
		newState.list.splice(action.payload,1)
		return newState
	}

	//处理发送ajax获取后台数据
	if(action.type == LOAD_DATA){
		const newState = JSON.parse(JSON.stringify(state))
		newState.list = action.payload
		return newState
	}
	return state
}