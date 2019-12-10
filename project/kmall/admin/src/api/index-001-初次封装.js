/*
* @Author: Chen
* @Date:   2019-12-05 19:38:06
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-06 20:13:15
*/
import {SERVER,API_CONFIG} from './config.js'
import axios from 'axios'
import {removeUsername} from 'util'

const getApiObj = (apiConfig)=>{
	const apiObj = {}
	for(let key in apiConfig){
		apiObj[key] = (data)=>{
			//发送请求
			let url = SERVER + apiConfig[key][0]
			let method = apiConfig[key][1]
			return request(url,method,data)
		}
	}

	return apiObj
}
const request = (url,method,data) =>{
	//处理异步用promise
	// console.log(url,method,data)
	return new Promise((resolve,reject)=>{
		//发送ajax
		axios({
			method:method,
			url:url,
			withCredentials:true,
			data:data
		})
		.then(result=>{
			//判断如果后台sessions过期或是通过别的途径被清除了,则前台也需要重新登录
			if(result.data.code == 10){
				//清除前台localStorage
				removeUsername()
				window.location.href = '/login'
				reject('用户没有权限')
			}
			resolve(result)
		})
		.catch(err=>{
			reject(err)
		})
	})
}

export default getApiObj(API_CONFIG)