/*
* @Author: Chen
* @Date:   2019-11-28 10:32:00
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-16 10:34:56
*/
import * as actionTypes from './actionTypes.js'
import { message } from 'antd'
import axios from 'axios'
import api from 'api'
import {saveUsername} from 'util/index.js'


//处理添加商品action
const setMainImageErrAction = ()=>({
	type:actionTypes.SET_MAIN_IMAGE_ERR
})
const setImagesErrAction = ()=>({
	type:actionTypes.SET_IMAGES_ERR
})
/*
export const getSaveAction = (err,values)=>{
	return (dispatch,getState)=>{
		// console.log(values)
		const state = getState().get('product')
		const mainImage = state.get('mainImage')
		const images = state.get('images')
		const detail = state.get('detail')
		// console.log(images)
		//当验证有错误时则不能提交请求
		let hasErr = false
		if(err){
			hasErr = true
		}
		if(!mainImage){
			hasErr = true
			dispatch(setMainImageErrAction())
		}
		if(!images){
			hasErr = true
			dispatch(setImagesErrAction())
		}

		if(hasErr){
			return 
		}
		api.addProducts({
			...values,
			mainImage:mainImage,
			images:images,
			detail:detail
		})
		.then(result=>{
			// console.log(result)
			const data = result.data
			if(data.code == 0){//登录成功
				message.success('添加商品成功',()=>{
					window.location.href = '/product'
				})
			}else{//登录失败
				message.error(data.message)
			}
		})
		.catch(err=>{
			message.error('请求失败,请稍后再试!')
		})
	}
}
*/
export const getSaveAction = (err,values)=>{
	return (dispatch,getState)=>{
		// console.log(values)
		const state = getState().get('product')
		const mainImage = state.get('mainImage')
		const images = state.get('images')
		const detail = state.get('detail')
		// console.log(images)
		//当验证有错误时则不能提交请求
		let hasErr = false
		if(err){
			hasErr = true
		}
		if(!mainImage){
			hasErr = true
			dispatch(setMainImageErrAction())
		}
		if(!images){
			hasErr = true
			dispatch(setImagesErrAction())
		}

		if(hasErr){
			return 
		}
		let request = api.addProducts
		if(values.id){
			request = api.updateProducts
		}
		request({
			...values,
			mainImage:mainImage,
			images:images,
			detail:detail
		})
		.then(result=>{
			// console.log(result)
			const data = result.data
			if(data.code == 0){//登录成功
				message.success(data.message,()=>{
					window.location.href = '/product'
				})
			}else{//登录失败
				message.error(data.message)
			}
		})
		.catch(err=>{
			message.error('请求失败,请稍后再试!')
		})
	}
}
//处理自定义组件将数据存入store
export const getMainImageAction = (payload)=>({
	type:actionTypes.SET_MAIN_IMAGE,
	payload
})
export const getImagesAction = (payload)=>({
	type:actionTypes.SET_IMAGES,
	payload
})
export const getDetailAction = (payload)=>({
	type:actionTypes.SET_DETAIL,
	payload
})


const setLevelCategories = (payload)=>({
	type:actionTypes.SET_LEVEL_CATEGORIES,
	payload
})
//处理获取分类action
export const getLevelCatagories = ()=>{
	return (dispatch,getState)=>{
		api.getLevelCategories({
			level:3
		})
		.then(result=>{
			// console.log('1::',result)
			const data = result.data
			if(data.code == 0){//登录成功
				//修改分类数组数据
				dispatch(setLevelCategories(data.data))
			}else{//登录失败
				message.error('请求失败,请稍后再试!')
			}
		})
		.catch(err=>{
			message.error('请求失败,请稍后再试!')
		})
	}
}
//处理获取商品列表数据
const getSetPageAction = (payload)=>({
	type:actionTypes.SET_PAGE,
	payload
})
const getPageStartAction = ()=>({
	type:actionTypes.PAGE_REQUEST_START
})
const getPageDoneAction = ()=>({
	type:actionTypes.PAGE_REQUEST_DONE
})
export const getPageAction = (page,keyword)=>{
	return (dispatch,getState)=>{
		//发送请求前loading
		dispatch(getPageStartAction())
		let options = {
			page:page
		}
		if(keyword){
			options.keyword = keyword
		}
		api.getProductList(options)
		.then(result=>{
			// console.log(result)
			const data = result.data
			if(data.code == 0){//登录成功
				dispatch(getSetPageAction(data.data))
			}else{//登录失败
				message.error(data.message)
			}
		})
		.catch(err=>{
			message.error('请求失败,请稍后再试!')
		})
		.finally(()=>{
			//请求后停止loading 
			dispatch(getPageDoneAction())
		})
	}
}

//处理更新显示隐藏
export const getUpdateIsShowAction = (id,newIsShow)=>{
	return (dispatch,getState)=>{
		const page = getState().get('product').get('current')
		api.updateProductIsShow({
			id:id,
			isShow:newIsShow,
			page:page
		})
		.then(result=>{
			const data = result.data
			if(data.code == 0){//登录成功
				message.success('更新显示隐藏成功')
				dispatch(getSetPageAction(data.data))
			}else{//登录失败
				message.error(data.message)
			}
		})
		.catch(err=>{
			message.error('请求失败,请稍后再试!')
		})
	}
}
//处理更新上架下架
export const getUpdateStatusAction = (id,newStatus)=>{
	return (dispatch,getState)=>{
		const page = getState().get('product').get('current')
		api.updateProductStatus({
			id:id,
			status:newStatus,
			page:page
		})
		.then(result=>{
			const data = result.data
			if(data.code == 0){//登录成功
				message.success('更新上下架成功')
				dispatch(getSetPageAction(data.data))
			}else{//登录失败
				message.error(data.message)
			}
		})
		.catch(err=>{
			message.error('请求失败,请稍后再试!')
		})
	}
}
//处理更新是否热卖
export const getUpdateIsHotAction = (id,newIsHot)=>{
	return (dispatch,getState)=>{
		const page = getState().get('product').get('current')
		api.updateProductIsHot({
			id:id,
			isHot:newIsHot,
			page:page
		})
		.then(result=>{
			const data = result.data
			if(data.code == 0){//登录成功
				message.success('更新是否热卖成功')
				dispatch(getSetPageAction(data.data))
			}else{//登录失败
				message.error(data.message)
			}
		})
		.catch(err=>{
			message.error('请求失败,请稍后再试!')
		})
	}
}
//处理更新排序
export const getUpdateOrderAction = (id,newOrder)=>{
	return (dispatch,getState)=>{
		const page = getState().get('product').get('current')
		api.updateProductOrder({
			id:id,
			order:newOrder,
			page:page
		})
		.then(result=>{
			const data = result.data
			if(data.code == 0){//登录成功
				message.success('更新排序成功')
				dispatch(getSetPageAction(data.data))
			}else{//登录失败
				message.error(data.message)
			}
		})
		.catch(err=>{
			message.error('请求失败,请稍后再试!')
		})
	}
}


//处理获取商品详情
const setProductDetailAction = (payload)=>({
	type:actionTypes.SET_PRODUCT_DETAIL,
	payload
})
export const getProductDetailAction = (id)=>{
	return (dispatch,getState)=>{
		api.getProductDetail({
			id:id,
		})
		.then(result=>{
			const data = result.data
			if(data.code == 0){//登录成功
				dispatch(setProductDetailAction(data.data))
			}else{//登录失败
				message.error(data.message)
			}
		})
		.catch(err=>{
			message.error('请求失败,请稍后再试!')
		})
	}
}
