/*
* @Author: Chen
* @Date:   2019-12-05 19:39:34
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-09 16:56:22
*/

export const SERVER = 'http://127.0.0.1:3000'
//第一个参数是路由
//第二个参数是请求方法
export const API_CONFIG = {
	login: 					['/sessions/users','post'],
	logout: 				['/sessions/users','delete'],
	getCounts: 				['/counts/','get'],
	getUserList: 			['/users/list','get'],
	addCategories: 			['/categories','post'],
	getLevelCategories: 	['/categories/levelCategories','get'],
	getCategoryList: 		['/categories/list','get'],
}