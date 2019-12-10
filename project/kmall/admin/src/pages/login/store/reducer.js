/*
* @Author: Chen
* @Date:   2019-11-27 16:35:26
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-04 11:54:43
*/
import * as actionTypes from './actionTypes.js'
import {fromJS} from 'immutable'

const defaultState = fromJS({
	isFetching:false
})

/*
	1.reducer是一个纯函数(有固定的输入就有固定的输出)
	2.reducer需要返回一个newState,不能更改函数参数中的state
	该state由store来进行管理,该state在store中被所有组件共享
	因此store根据reducer返回的newState更改自己的state,在组件中通过getState()
	获取的是store中的state
*/

export default (state=defaultState,action)=>{
	if(action.type == actionTypes.LOGIN_REQUEST_START){
		return state.set('isFetching',true)
	}
	if(action.type == actionTypes.LOGIN_REQUEST_DONE){
		return state.set('isFetching',false)
	}

	return state
}