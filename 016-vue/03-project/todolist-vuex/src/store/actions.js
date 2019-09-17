// 组件中用由this.$store.dispatch方法来派发action
//action中用commit来提交mutation
// action中可以包含异步操作
import {ADD_TODO,DEL_TODO,ALL_DONE,DEL_ALL_DONE} from './types.js'
export default {
	[ADD_TODO](store,todo){
		//拿到store中commit方法
		//确认修改数据
		store.commit(ADD_TODO,todo);
	},
	[DEL_TODO](store,index){
		store.commit(DEL_TODO,index);
	},
	[ALL_DONE](store,value){
		store.commit(ALL_DONE,value);
	},
	[DEL_ALL_DONE](store){
		store.commit(DEL_ALL_DONE);
	},
}