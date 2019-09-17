//唯一更改state的方法
//mutation必须是同步函数
import {GET_ADS,GET_HOME_FLOORS} from './types.js'
export default {
	[GET_ADS](state,payload){
		//state就是整个store中唯一存放数据源
		//payload是将要改变的数据
		state.ads = payload;
	},
	[GET_HOME_FLOORS](state,payload){
		state.homeFloors = payload;
	},
}