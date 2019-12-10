/*
* @Author: Chen
* @Date:   2019-11-27 16:35:26
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-02 19:47:41
*/
import * as actionTypes from './actionTypes.js'
import {fromJS} from 'immutable'

const defaultState = fromJS({
	list:["吃饭","睡觉"],
	task:''
})

/*
	1.reducer是一个纯函数(有固定的输入就有固定的输出)
	2.reducer需要返回一个newState,不能更改函数参数中的state
	该state由store来进行管理,该state在store中被所有组件共享
	因此store根据reducer返回的newState更改自己的state,在组件中通过getState()
	获取的是store中的state
*/

export default (state=defaultState,action)=>{
	if(action.type == actionTypes.CHANGE_ITEM){
		/*
		const newState = JSON.parse(JSON.stringify(state))
		newState.task = action.payload
		return newState
		*/
		return state.set('task',action.payload)
	}
	if(action.type == actionTypes.ADD_ITEM){
		/*
		const newState = JSON.parse(JSON.stringify(state))
		newState.list.push(state.task)
		newState.task = ''
		return newState
		*/
		const list = [...state.get('list')]
		list.push(state.get('task'))
		return state.merge({
			list,
			task:''
		})
	}
	if(action.type == actionTypes.DEL_ITEM){
		/*
		const newState = JSON.parse(JSON.stringify(state))
		newState.list.splice(action.payload,1)
		return newState
		*/
		const list = [...state.get('list')]
		list.splice(action.payload,1)
		return state.set('list',list)
	}

	//处理发送ajax获取后台数据
	if(action.type == actionTypes.LOAD_DATA){
		/*
		const newState = JSON.parse(JSON.stringify(state))
		newState.list = action.payload
		return newState
		*/
		return state.set('list',action.payload)
	}
	return state
}