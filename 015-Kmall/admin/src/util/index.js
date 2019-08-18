const axios = require('axios');

export const request = (options)=>{
	return new Promise((resolve,rejected)=>{
		const params = {
			method:options.method || 'get',
			url:options.url || '',
			data:options.data || ''
		}
		axios(params)
		.then(result=>{
			resolve(result.data)
		})
		.catch(err=>{
			rejected(err);
		})
	})
}

export const setUsername = (username)=>{
	window.localStorage.setItem('username',username);
}
export const getUsername = ()=>{
	return window.localStorage.getItem('username');
}
export const removeUsername = ()=>{
	return window.localStorage.removeItem('username');
}