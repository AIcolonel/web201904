/*
* @Author: Chen
* @Date:   2019-11-27 16:35:26
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-28 09:41:03
*/
const defaultState = {
	list:["吃饭","睡觉","打游戏","上网"],
	task:''
}

export default (state=defaultState,action)=>{
	if(action.type == 'change_item'){
		//错误写法
		state.task = action.payload
	}
	return state
}