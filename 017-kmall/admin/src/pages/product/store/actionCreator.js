/*
* @Author: TomChen
* @Date:   2019-08-12 15:11:47
* @Last Modified by:   TomChen
* @Last Modified time: 2019-08-21 16:42:47
*/
import api from 'api'
import { message } from 'antd'

import * as types  from './actionTypes.js'

import { saveUsername } from 'util'

const getPageReqestStartAction = ()=>({
    type:types.PAGE_REQEST_START,
})
const getPageReqestDoneAction = ()=>({
    type:types.PAGE_REQEST_DONE,
})

const getSetPageAction = (payload)=>({
    type:types.SET_PAGE,
    payload
})

const setCategoriesAction = (payload)=>({
    type:types.SET_CATEGORIES,
    payload
})
const setMainImageErrorAction = ()=>({
    type:types.SET_MAIN_IMAGE_ERROR,
})
const setImagesErrorAction = ()=>({
    type:types.SET_IMAGES_ERROR,
})
export const setMainImageAction = (payload)=>({
    type:types.SET_MAIN_IMAGE,
    payload
})
export const setImagesAction = (payload)=>({
    type:types.SET_IMAGES,
    payload
})
export const setDetailAction = (payload)=>({
    type:types.SET_DETAIL,
    payload
})


export const getSaveAction = (err,values)=>{
    return (dispatch,getState)=>{
        const state = getState().get('product')
        const mainImage = state.get('mainImage')
        const images = state.get('images')
        const detail = state.get('detail')
        
        let hasErr = false
        if(err){
            hasErr = true
        }
        if(!mainImage){
            hasErr = true
            dispatch(setMainImageErrorAction())
        }
        if(!images){
            hasErr = true
            dispatch(setImagesErrorAction())
        }

        if(hasErr){
            return
        }
        let request = api.addProducts
        if(values.id){
            request = api.updateProducts
        }
        request({
            ...values,
            mainImage,
            images,
            detail
        })
        .then(result=>{
            if(result.code == 0){
                message.success(result.message,()=>{
                    window.location.href = "/product"
                })
            }else{
                message.error(result.message)
            }
            
        })
        .catch(err=>{
            message.error('网络错误,请稍后再试')
        })
                    
    }
}
export const getLevelCategoriesAction = ()=>{
    return (dispatch,getState)=>{
        api.getlevelCategories({
            level:3
        })
        .then(result=>{
            if(result.code == 0){
                dispatch(setCategoriesAction(result.data))
            }
        })
        .catch(err=>{
            message.error('网络错误,请稍后再试')
        })              
    }
}
export const getPageAction = (page,keyword)=>{
    return (dispatch,getState)=>{
        dispatch(getPageReqestStartAction())
        const options = {
            page:page
        }
        if(keyword){
            options.keyword = keyword
        }
        api.getProductsList(options)
        .then(result=>{
            if(result.code == 0){
                dispatch(getSetPageAction(result.data))
            }else{
                message.error('获取商品数据失败,请稍后再试')
            }
        })
        .catch(err=>{
            message.error('网络错误,请稍后再试')
        })
        .finally(()=>{
            dispatch(getPageReqestDoneAction())
        })                 
    }
}


export const getUpdateIsShowAction = (id,newIsShow)=>{
    return (dispatch,getState)=>{
        const page = getState().get('product').get('current')
        api.updateProductsIsShow({
            id:id,
            isShow:newIsShow,
            page:page
        })
        .then(result=>{
            if(result.code == 0){
                message.success('更新显示隐藏成功')
                dispatch(getSetPageAction(result.data))
            }else{
                message.error(result.message)
            }
        })
        .catch(err=>{
            message.error('网络错误,请稍后再试')
        })               
    }
}
export const getUpdateStatusAction = (id,newStatus)=>{
    return (dispatch,getState)=>{
        const page = getState().get('product').get('current')
        api.updateProductsStatus({
            id:id,
            status:newStatus,
            page:page
        })
        .then(result=>{
            if(result.code == 0){
                message.success('更新上架下架成功')
                dispatch(getSetPageAction(result.data))
            }else{
                message.error(result.message)
            }
        })
        .catch(err=>{
            message.error('网络错误,请稍后再试')
        })               
    }
}
export const getUpdateIsHotAction = (id,newIsHot)=>{
    return (dispatch,getState)=>{
        const page = getState().get('product').get('current')
        api.updateProductsIsHot({
            id:id,
            isHot:newIsHot,
            page:page
        })
        .then(result=>{
            if(result.code == 0){
                message.success('更新是否成功')
                dispatch(getSetPageAction(result.data))
            }else{
                message.error(result.message)
            }
        })
        .catch(err=>{
            message.error('网络错误,请稍后再试')
        })               
    }
}
export const getUpdateOrderAction = (id,newOrder)=>{
    return (dispatch,getState)=>{
        const page = getState().get('product').get('current')
        api.updateProductsOrder({
            id:id,
            order:newOrder,
            page:page
        })
        .then(result=>{
            if(result.code == 0){
                message.success('更新排序成功')
                dispatch(getSetPageAction(result.data))
            }else{
                message.error(result.message)
            }
        })
        .catch(err=>{
            message.error('网络错误,请稍后再试')
        })               
    }
}

const setProductDetailAction = (payload)=>({
    type:types.SET_PRODUCT_DETAIL,
    payload
})

export const getProductDetailAction = (productId)=>{
    return (dispatch,getState)=>{
        api.getProductDetail({
            id:productId
        })
        .then(result=>{
            if(result.code == 0){
                dispatch(setProductDetailAction(result.data))
            }
            
        })
        .catch(err=>{
            message.error('网络错误,请稍后再试')
        })              
    }
}


