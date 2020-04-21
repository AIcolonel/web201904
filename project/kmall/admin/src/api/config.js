/*
* @Author: Chen
* @Date:   2019-12-05 19:39:34
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-27 15:20:14
*/

export const SERVER = 'http://127.0.0.1:3000'
export const UPLOAD_PRODUCT_IMAGE = SERVER + '/products/images'
export const UPLOAD_PRODUCT_DETAIL_IMAGE = SERVER + '/products/detailImages'
export const UPLOAD_AD_IMAGE = SERVER + '/ads/image'
//第一个参数是路由
//第二个参数是请求方法
export const API_CONFIG = {
	login: 							['/sessions/users','post'],
	logout: 						['/sessions/users','delete'],
	getCounts: 						['/counts/','get'],
	getUserList: 					['/users/list','get'],
	addCategories: 					['/categories','post'],
	getLevelCategories: 			['/categories/levelCategories','get'],
	getCategoryList: 				['/categories/list','get'],
	updateCategoryName: 			['/categories/name','put'],
	updateCategoryMobileName: 		['/categories/mobileName','put'],
	updateCategoryOrder: 			['/categories/order','put'],
	updateCategoryIsShow: 			['/categories/isShow','put'],
	addProducts: 					['/products','post'],
	getProductList: 				['/products/list','get'],
	updateProductIsShow: 			['/products/isShow','put'],
	updateProductStatus: 			['/products/status','put'],
	updateProductIsHot: 			['/products/isHot','put'],
	updateProductOrder: 			['/products/order','put'],
	getProductDetail: 				['/products/detail','get'],
	updateProducts: 				['/products','put'],
	getAdsList:                  	["/ads/list","get"],
    getAdsDetail:                	["/ads/detail","get"],
    addAds:                      	["/ads","post"],
    updateAds:                  	["/ads","put"],
    updateAdsOrder:              	["/ads/order","put"],
    updateAdsIsShow:             	["/ads/isShow","put"],
   
    getOrdersList:               	["/orders/list","get"],
    getOrdersDetail:             	["/orders/detail","get"],
    updateOrdersStatus:          	["/orders/status","put"],  
}