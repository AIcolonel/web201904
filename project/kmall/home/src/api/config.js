/*
* @Author: Chen
* @Date:   2019-12-18 09:37:46
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-27 11:13:50
*/
//第一个参数是路由
//第二个参数是请求方法
var API_CONFIG = {
	login: 							['/sessions/users','post'],
	getUsername: 					['/sessions/username','get'],
	logout: 						['/sessions/users','delete'],
	register: 						['/users','post'],
	checkUsername: 					['/users/checkUsername','get'],
	getUserInfo: 					['/sessions/users','get'],
	updateUsers: 					['/users','put'],
	getHomeCategories: 				['/categories/homeCategories','get'],
	getHomeAds: 					['/ads/positionAds','get'],
	getHomeFloors: 					['/floors','get'],
	getProductsList:  				['/products/list','get'],
	getProductDetail:  				['/products/detail','get'],
	addCarts:  						['/carts','post'],
	getCartsCount:  				['/carts/count','get'],
	getCarts:  						['/carts','get'],
	updateCartsChoice:  			['/carts/choices','put'],
	deleteCarts:  					['/carts','delete'],
	updateCartsCounts:  			['/carts/counts','put'],

	getOrdersProducts: 				['/orders/products','get'],
	addShippings: 					['/shippings','post'],
	getShippings: 					['/shippings/list','get'],
	deleteShippings: 				['/shippings','delete'],
	getShippingsDetail: 			['/shippings/detail','get'],
	updateShippings: 			 	['/shippings','put'],

	addOrders: 						['/orders','post'],

	getPayments: 					['/payments','get'],
	getPaymentsStatus: 				['/payments/status','get'],

	getOrdersList: 					['/orders/list','get'],
	getOrdersDetail: 				['/orders/detail','get'],
	updateOrdersStatus: 			['/orders/status','put'],
}
module.exports = {
	API_CONFIG
}