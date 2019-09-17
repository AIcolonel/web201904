/*
* @Author: TomChen
* @Date:   2019-08-15 11:48:45
* @Last Modified by:   TomChen
* @Last Modified time: 2019-08-15 11:50:18
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