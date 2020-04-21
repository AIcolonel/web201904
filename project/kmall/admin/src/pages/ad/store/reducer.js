/*
* @Author: Tom
* @Date:   2019-04-11 11:18:06
* @Last Modified by:   Tom
* @Last Modified time: 2019-08-22 21:52:20
*/
import * as types from './actionTypes.js'
import { fromJS } from 'immutable'

const defaultState = fromJS({
	
	imageValidateStatus:'',
	imageHelp:'',

	isPageFetching:false,
	list:[],
	current:0,
	total:0,
	pageSize:0,	

	image:'',
	name:'',
	link:'',
	position:'',
	order:'',
	isShow:'',
})
export default (state=defaultState,action)=>{
	if(action.type === types.SET_IMAGE){
		return state.merge({
			image:action.payload,
			imageValidateStatus:'',
			imageHelp:''			
		})
	}	
	if(action.type === types.SET_IMAGE_ERROR){
		return state.merge({
			imageValidateStatus:'error',
			imageHelp:'请上传图片',			
		})
	}	
	if(action.type === types.SET_PAGE){
		return state.merge({
			current:action.payload.current,
			total:action.payload.total,
			pageSize:action.payload.pageSize,
			list:fromJS(action.payload.list),
		})		
	}
	if(action.type === types.PAGE_REQUEST){
		return state.set('isPageFetching',true)
	}

	if(action.type === types.PAGE_DONE){
		return state.set('isPageFetching',false)
	}

	if(action.type === types.SET_AD_DETAIL){
		return state.merge({
			image:action.payload.image,
			name:action.payload.name,
			link:action.payload.link,
			position:action.payload.position,
			order:action.payload.order,
			isShow:action.payload.isShow,			
		})		
	}												
	return state;
}