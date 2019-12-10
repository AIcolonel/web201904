/*
* @Author: Chen
* @Date:   2019-11-28 10:32:00
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-05 19:55:57
*/
import * as actionTypes from './actionTypes.js'
import { message } from 'antd'
import axios from 'axios'
import api from 'api'
import {saveUsername} from 'util/index.js'

const getLoginStartAction = ()=>({
	type:actionTypes.LOGIN_REQUEST_START
})
const getLoginDoneAction = ()=>({
	type:actionTypes.LOGIN_REQUEST_DONE
})
//登录发送请求action(利用redux-thunk)
export const getLoginAction = (values)=>{
	return (dispatch,getState)=>{
		//发送请求前loading
		dispatch(getLoginStartAction())
		values.role = 'admin'
		api.login(values)
		.then(result=>{
			const data = result.data
			if(data.code == 0){//登录成功
				//1.在前台保存用户状态
				saveUsername(data.data.username)
				//2.返回后台首页
				window.location.href = '/'
			}else{//登录失败
				message.error(data.message)
			}
		})
		.catch(err=>{
			message.error('请求失败,请稍后再试!')
		})
		.finally(()=>{
			//请求后停止loading 
			dispatch(getLoginDoneAction())
		})
		/*
		axios({
			method: 'post',
			url:'http://127.0.0.1:3000/sessions/users',
			data:values,
			withCredentials:true
		})
		.then(result=>{
			// console.log(result)
			const data = result.data
			if(data.code == 0){//登录成功
				//1.在前台保存用户状态
				saveUsername(data.data.username)
				//2.返回后台首页
				window.location.href = '/'
			}else{//登录失败
				message.error(data.message)
			}
			
		})
		.catch(err=>{
			message.error('请求失败,请稍后再试!')
		})
		.finally(()=>{
			//请求后停止loading 
			dispatch(getLoginDoneAction())
		})
		*/

	}
}
