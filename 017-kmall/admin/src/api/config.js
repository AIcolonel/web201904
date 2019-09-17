/*
* @Author: TomChen
* @Date:   2019-08-16 10:20:25
* @Last Modified by:   TomChen
* @Last Modified time: 2019-08-28 17:03:48
*/

export const SERVER = 'http://127.0.0.1:3000'
export const UPLOAD_PRODUCT_IMAGE = SERVER + '/products/images'
export const UPLOAD_PRODUCT_DETAIL_IMAGES = SERVER + '/products/detailImages'
export const UPLOAD_AD_IMAGE = SERVER + '/ads/image'

export const API_CONFIG = {
    login:                       ['/sessions/users','post'],
    logout:                      ['/sessions/users','delete'],
    getCounts:                   ['/counts','get'],
    getUserList:                 ['/users/list','get'],
    addCategories:               ['/categories','post'],
    getlevelCategories:          ['/categories/levelCategories','get'],
    getCategoriesList:           ['/categories/list','get'],
    updateCategoriesName:        ['/categories/name','put'],
    updateCategoriesMobileName:  ['/categories/mobileName','put'],
    updateCategoriesOrder:       ['/categories/order','put'],
    updateCategoriesIsShow:      ['/categories/isShow','put'],
    addProducts:                 ['/products','post'],
    updateProducts:              ['/products','put'],
    getProductsList:             ['/products/list','get'],
    getProductDetail:            ['/products/detail','get'],
    updateProductsIsShow:        ['/products/isShow','put'],
    updateProductsStatus:        ['/products/status','put'],
    updateProductsIsHot:         ['/products/isHot','put'],
    updateProductsOrder:         ['/products/order','put'],
    getAdsList:                  ["/ads/list","get"],
    getAdsDetail:                ["/ads/detail","get"],
    addAds:                      ["/ads","post"],
    updateAds:                   ["/ads","put"],
    updateAdsOrder:              ["/ads/order","put"],
    updateAdsIsShow:             ["/ads/isShow","put"],
    getOrdersList:               ["/orders/list","get"],
    getOrdersDetail:             ["/orders/detail","get"],
    updateOrdersStatus:          ["/orders/status","put"],           
}