import * as types from './actionTypes.js';
import { fromJS } from'immutable';

/*
const defaultState = {
	list:["电视","冰箱","洗衣机"],
	val:'空调'
}
*/
const defaultState = fromJS({
	list:["电视","冰箱","洗衣机"],
	val:'空调'
})

export default ((state=defaultState,action)=>{
	if(action.type == types.CHANGE_ITEM){
		/*
		//生成一个新的对象
		const newState = JSON.parse(JSON.stringify(state));
		newState.val = action.payload;
		//返回新对象
		return newState;
		*/
		return state.set('val',action.payload)
	}
	if(action.type == types.ADD_ITEM){
		/*
		//生成一个新的对象
		const newState = JSON.parse(JSON.stringify(state));
		newState.list.push(newState.val);
		newState.val = '';
		//返回新对象
		return newState;
		*/
		//拿到数组要生成新的数组
		const list = [...state.get('list')];
		list.push(state.get('val'));
		return state.merge({
			list:list,
			val:''
		})
	}
	if(action.type == types.DELETE_ITEM){
		/*
		//生成一个新的对象
		const newState = JSON.parse(JSON.stringify(state));
		newState.list.splice(action.payload,1);
		//返回新对象
		return newState;
		*/
		//拿到数组要生成新的数组
		const list = [...state.get('list')];
		list.splice(action.payload,1);
		return state.set('list',list);
	}
	if(action.type == types.LOAD_DATA){
		/*
		//生成一个新的对象
		const newState = JSON.parse(JSON.stringify(state));
		newState.list = action.payload;
		//返回新对象
		return newState;
		*/
		return state.set('list',action.payload);
	}
	return state;
})