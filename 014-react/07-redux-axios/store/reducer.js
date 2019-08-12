import { 
	CHANGE_ITEM,
	ADD_ITEM,
	DELETE_ITEM,
	LOAD_DATA } 
from '../store/actionTypes.js'

const defaultState = {
	list:["电视","冰箱","洗衣机"],
	val:'空调'
}

export default ((state=defaultState,action)=>{
	// console.log(action)
	if(action.type == CHANGE_ITEM){
		//生成一个新的对象
		const newState = JSON.parse(JSON.stringify(state));
		newState.val = action.payload;
		//返回新对象
		return newState;
	}
	if(action.type == ADD_ITEM){
		//生成一个新的对象
		const newState = JSON.parse(JSON.stringify(state));
		newState.list.push(newState.val);
		newState.val = '';
		//返回新对象
		return newState;
	}
	if(action.type == DELETE_ITEM){
		//生成一个新的对象
		const newState = JSON.parse(JSON.stringify(state));
		newState.list.splice(action.payload,1);
		//返回新对象
		return newState;
	}
	if(action.type == LOAD_DATA){
		//生成一个新的对象
		const newState = JSON.parse(JSON.stringify(state));
		newState.list = action.payload;
		//返回新对象
		return newState;
	}
	return state;
})