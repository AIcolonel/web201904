/*
* @Author: Chen
* @Date:   2019-12-04 11:28:03
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-04 15:41:24
*/
export const saveUsername = (username)=>{
	window.localStorage.setItem('username',username)
}
export const getUsername = ()=>{
	return window.localStorage.getItem('username')
}
export const removeUsername = ()=>{
	window.localStorage.removeItem('username')
}