/*
* @Author: Chen
* @Date:   2020-01-06 10:21:56
* @Last Modified by:   Chen
* @Last Modified time: 2020-01-08 10:20:52
*/
//唯一更改state的方法
//mutation必须是同步函数
//在mutation中更改state数据
import { GET_ADS,GET_FLOORS } from './types.js'
export default {
	[GET_ADS](state,payload){
		// console.log(payload.homeAds)
		state.ads = payload.homeAds
	},
	[GET_FLOORS](state,payload){
		// console.log(payload.homeFloors)
		state.floors = payload.homeFloors
	},
	
}