/*
* @Author: Chen
* @Date:   2019-12-05 19:38:06
* @Last Modified by:   Chen
* @Last Modified time: 2020-01-07 15:57:02
*/
import {API_CONFIG} from './config.js'
import axios from 'axios'

const getApiObj = (apiConfig)=>{
	const apiObj = {}
	for(let key in apiConfig){
		apiObj[key] = (data)=>{
			//发送请求
			let url = apiConfig[key][0]
			let method = apiConfig[key][1]
			return request(url,method,data)
		}
	}

	return apiObj
}
const request = (url,method,data) =>{
	//处理异步用promise
	return new Promise((resolve,reject)=>{
		//发送ajax
		const options = {
			method:method,
			url:url,
			withCredentials:true
		}
		//携带参数:
		switch(method.toUpperCase()){
			case 'GET':
			case 'DELETE':
			  	options.params = data
			  	break
			default : 
				options.data = data
		}
		axios(options)
		.then(result=>{
			//判断如果后台sessions过期或是通过别的途径被清除了,则前台也需要重新登录
			if(result.data.code == 10){
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