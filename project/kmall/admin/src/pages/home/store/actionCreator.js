/*
* @Author: Chen
* @Date:   2019-11-28 10:32:00
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-06 09:40:12
*/
import * as actionTypes from './actionTypes.js'
import { message } from 'antd'
import axios from 'axios'
import api from 'api'
import {saveUsername} from 'util/index.js'

const getSetCountAction = (payload)=>({
	type:actionTypes.SET_COUNT,
	payload
})
//登录发送请求action(利用redux-thunk)
export const getCountAction = ()=>{
	return (dispatch,getState)=>{
		api.getCounts()
		.then(result=>{
			// console.log(result)
			const data = result.data
			if(data.code == 0){//登录成功
				dispatch(getSetCountAction(data.data))
			}else{//登录失败
				message.error('请求失败,请稍后再试!')
			}
		})
		.catch(err=>{
			message.error('请求失败,请稍后再试!')
		})
		/*
		axios({
			method: 'get',
			url:'http://127.0.0.1:3000/counts/',
			withCredentials:true
		})
		.then(result=>{
			console.log(result)
			const data = result.data
			if(data.code == 0){//登录成功
				dispatch(getSetCountAction(data.data))
			}else{//登录失败
				message.error('请求失败,请稍后再试!')
			}
		})
		.catch(err=>{
			message.error('请求失败,请稍后再试!')
		})
		*/

	}
}
