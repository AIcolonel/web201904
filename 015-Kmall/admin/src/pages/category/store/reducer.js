import * as types from './actionTypes.js';
import { fromJS } from'immutable';

const defaultState = fromJS({
	isAddLoading:false,
	levelCategories:[],
	list:[],
	current:1,
	pageSize:0,
	total:0,
	isLoading:false
})

export default ((state=defaultState,action)=>{
	//获取并添加分类信息
	if(action.type == types.ADD_CATEGORY){
		return state.set('isAddLoading',true);
	}
	if(action.type == types.ADD_CATEGORY_DONE){
		return state.set('isAddLoading',false);
	}
	if(action.type == types.SET_LEVEL_CATEGORIES){
		return state.merge({
			levelCategories:fromJS(action.payload)
		});
	}
	//获取并设置分类分页信息
	if(action.type == types.SET_PAGES){
		return state.merge({
			list:fromJS(action.payload.list),
			current:action.payload.current,
			pageSize:action.payload.pageSize,
			total:action.payload.total
		})
	}
	if(action.type == types.DATA_LOADING){
		return state.set('isLoading',true);
	}
	if(action.type == types.DATA_DONE){
		return state.set('isLoading',false);
	}
	return state;
})