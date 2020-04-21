/*
* @Author: Chen
* @Date:   2019-11-27 16:35:26
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-16 10:37:55
*/
import * as actionTypes from './actionTypes.js'
import {fromJS} from 'immutable'

const defaultState = fromJS({
	categories:[],
	isFetching:false,
	list:[],
	current:0,
	pageSize:0,
	total:0,

	mainImage:'',
	images:'',
	detail:'',

	mainImageValidateStatus:'',
	mainImageHelp:'',
	imagesValidateStatus:'',
	imagesHelp:'',

	category:'',
	categoryName:'',
	name:'',
	description:'',
	price:'',
	stock:'',

	keyword:''
})
export default (state=defaultState,action)=>{
	//处理获取分页分类数据
	if(action.type == actionTypes.SET_PAGE){
		return state.merge({
			list:fromJS(action.payload.list),
			current:fromJS(action.payload.current),
			pageSize:fromJS(action.payload.pageSize),
			total:fromJS(action.payload.total),
			keyword:fromJS(action.payload.keyword),
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
	//处理自定义组件存值
	//只要自定义组件存值则说明上传图片所以需要把错误提示清除
	if(action.type == actionTypes.SET_MAIN_IMAGE){
		return state.merge({
			mainImage:action.payload,
			mainImageValidateStatus:'',
			mainImageHelp:''
		})
	}
	if(action.type == actionTypes.SET_IMAGES){
		return state.merge({
			images:action.payload,
			imagesValidateStatus:'',
			imagesHelp:''
		})
	}
	if(action.type == actionTypes.SET_DETAIL){
		return state.set('detail',action.payload)
	}
	//处理自定义验证
	if(action.type == actionTypes.SET_MAIN_IMAGE_ERR){
		return state.merge({
			mainImageValidateStatus:'error',
			mainImageHelp:'请添加封面图片'
		})
	}
	if(action.type == actionTypes.SET_IMAGES_ERR){
		return state.merge({
			imagesValidateStatus:'error',
			imagesHelp:'请添加商品图片'
		})
	}

	//处理获取商品详情
	if(action.type == actionTypes.SET_PRODUCT_DETAIL){
		return state.merge({
			category:action.payload.category._id,
			categoryName:action.payload.category.name,
			name:action.payload.name,
			description:action.payload.description,
			price:action.payload.price,
			stock:action.payload.stock,
			mainImage:action.payload.mainImage,
			images:action.payload.images,
			detail:action.payload.detail,
		})
	}
	return state
}