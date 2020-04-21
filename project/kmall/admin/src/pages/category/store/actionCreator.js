/*
* @Author: Chen
* @Date:   2019-11-28 10:32:00
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-10 11:45:16
*/
import * as actionTypes from './actionTypes.js'
import { message } from 'antd'
import axios from 'axios'
import api from 'api'
import {saveUsername} from 'util/index.js'


//处理添加分类action
export const getAddAction = (values)=>{
	return (dispatch,getState)=>{
		api.addCategories(values)
		.then(result=>{
			// console.log(result)
			const data = result.data
			if(data.code == 0){//登录成功
				message.success('新增分类成功')
				dispatch(setLevelCategories(data.data))
			}else{//登录失败
				message.error(data.message)
			}
		})
		.catch(err=>{
			message.error('请求失败,请稍后再试!')
		})
	}
}
const setLevelCategories = (payload)=>({
	type:actionTypes.SET_LEVEL_CATEGORIES,
	payload
})
//处理获取分类action
export const getLevelCatagories = ()=>{
	return (dispatch,getState)=>{
		api.getLevelCategories({
			level:2
		})
		.then(result=>{
			console.log(result)
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
//处理获取分类数据
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
export const getPageAction = (page)=>{
	return (dispatch,getState)=>{
		//发送请求前loading
		dispatch(getPageStartAction())
		api.getCategoryList({
			page:page
		})
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
//处理更新分类名称
export const getUpdateNameAction = (id,newName)=>{
	return (dispatch,getState)=>{
		// console.log(getState().get('category').get('current'))
		const page = getState().get('category').get('current')
		api.updateCategoryName({
			id:id,
			name:newName,
			page:page
		})
		.then(result=>{
			const data = result.data
			if(data.code == 0){//登录成功
				message.success('更新分类名称成功')
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
//处理更新手机分类
export const getUpdateMobileNameAction = (id,newMobileName)=>{
	return (dispatch,getState)=>{
		const page = getState().get('category').get('current')
		api.updateCategoryMobileName({
			id:id,
			mobileName:newMobileName,
			page:page
		})
		.then(result=>{
			const data = result.data
			if(data.code == 0){//登录成功
				message.success('更新手机分类名称成功')
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
		const page = getState().get('category').get('current')
		api.updateCategoryOrder({
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
//处理更新上下架
export const getUpdateIsShowAction = (id,newIsShow)=>{
	return (dispatch,getState)=>{
		const page = getState().get('category').get('current')
		api.updateCategoryIsShow({
			id:id,
			isShow:newIsShow,
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
