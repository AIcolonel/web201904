//唯一更改state的方法
//mutation必须是同步函数
import {ADD_TODO,DEL_TODO,ALL_DONE,DEL_ALL_DONE} from './types.js'
export default {
	[ADD_TODO](state,payload){
		//state就是整个store中唯一存放数据源
		//payload是将要改变的数据
		state.todos.unshift(payload);
	},
	[DEL_TODO](state,payload){
		state.todos.splice(payload,1);
	},
	[ALL_DONE](state,payload){
		state.todos.forEach((item)=>{
            item.done = payload;
        })
	},
	[DEL_ALL_DONE](state){
		//数组过滤筛选
        state.todos = state.todos.filter((item)=>{
            return item.done != true;
        })
	}
}