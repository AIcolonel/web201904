/*
* @Author: Chen
* @Date:   2019-11-27 16:35:26
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-09 12:00:19
*/
import * as actionTypes from './actionTypes.js'
import {fromJS} from 'immutable'

const defaultState = fromJS({
	categories:[],
	isFetching:false,
	list:[
		{	
			_id:1,
			username:'admin',
			isAdmin:true,
			email:'110110110@qq.com',
			phone:13836544563,
			createdAt:'2019-12-06 10:10:10'
		}
	],
	current:0,
	pageSize:0,
	total:0
})
export default (state=defaultState,action)=>{
	if(action.type == actionTypes.SET_PAGE){
		return state.merge({
			list:fromJS(action.payload.list),
			current:fromJS(action.payload.current),
			pageSize:fromJS(action.payload.pageSize),
			total:fromJS(action.payload.total),
		})
	}
	if(action.type == actionTypes.PAGE_REQUEST_START){
		return state.set('isFetching',true)
	}
	if(action.type == actionTypes.PAGE_REQUEST_DONE){
		return state.set('isFetching',false)
	}
	//处理获取最新父级分类
	if(action.type == actionTypes.SET_LEVEL_CATEGORIES){
		return state.set('categories',fromJS(action.payload))
	}
	return state
}