/*
* @Author: Chen
* @Date:   2020-01-08 10:18:45
* @Last Modified by:   Chen
* @Last Modified time: 2020-01-08 10:23:25
*/
export default {
	formatPrice(price=0){
		return '￥'+parseFloat(price).toFixed(2)
	}
}