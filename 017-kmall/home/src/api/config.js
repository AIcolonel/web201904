/*
* @Author: TomChen
* @Date:   2019-08-22 16:20:08
* @Last Modified by:   TomChen
* @Last Modified time: 2019-08-28 16:48:56
*/
var API_CONFIG = {
    login:                       ['/sessions/users','post'],
    getUsername:                 ['/sessions/username','get'],
    logout:                      ['/sessions/users','delete'],
    register:                    ['/users','post'],
    checkUsername:               ['/users/checkUsername','get'],
    getUserinfo:                 ['/sessions/users','get'],
    updateUsers:                 ['/users','put'],
    
    getHomeCategories:           ['/categories/homeCategories','get'],
    getPositionAds:              ['/ads/positionAds','get'],
    getFloors:                   ['/floors','get'],
    
    getProductsList:             ['/products/list','get'],    
    getProductsDetail:           ['/products/detail','get'],    
    
    addCarts:                    ['/carts','post'],    
    getCartsCount:               ['/carts/count','get'],    
    getCarts:                    ['/carts','get'],    
    updateCartsChoices:          ['/carts/choices','put'],    
    deleteCarts:                 ['/carts','delete'],    
    updateCartsCounts:           ['/carts/counts','put'], 

    getOrdersProducts:           ['/orders/products','get'],
    addOrders:                   ['/orders','post'],
    getOrdersList:               ['/orders/list','get'],
    getOrdersDetail:             ['/orders/detail','get'],
    updateOrdersStatus:          ['/orders/status','put'],

    addShippings:                ['/shippings','post'],      
    getShippingsList:            ['/shippings/list','get'],      
    deleteShippings:             ['/shippings','delete'],      
    getShippingsDetail:          ['/shippings/detail','get'],      
    updateShippings:             ['/shippings','put'],

    getPayments:                 ['/payments','get'], 
    getPaymentsStatus:           ['/payments/status','get'], 
}

module.exports = {
    API_CONFIG
}