/*
* @Author: Chen
* @Date:   2019-11-28 10:32:00
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-09 16:56:39
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
			console.log(result)
			/*
			const data = result.data
			if(data.code == 0){//登录成功
				dispatch(getSetPageAction(data.data))
			}else{//登录失败
				message.error('请求失败,请稍后再试!')
			}
			*/
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