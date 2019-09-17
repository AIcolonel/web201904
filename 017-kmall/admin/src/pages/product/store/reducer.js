/*
* @Author: TomChen
* @Date:   2019-08-12 10:29:05
* @Last Modified by:   TomChen
* @Last Modified time: 2019-08-21 16:47:39
*/

import * as types  from './actionTypes.js'

import { fromJS } from 'immutable'

const defaultState = fromJS({
    categories:[],
    isFetching:false,
    list:[],
    current:1,
    total:0,
    pageSize:0,

    mainImage:'',
    images:'',
    detail:'',
    mainImageValidateStatus:'',    
    mainImageHelp:'', 
    imagesValidateStatus:'',    
    imagesHelp:'',

    category:'',
    name:'',
    description:'',
    price:'',
    stock:'',
    detail:'',

    keyword:'',         
})

export default (state=defaultState,action)=>{
    if( action.type == types.SET_PAGE){
        return state.merge({
            list:fromJS(action.payload.list),
            current:action.payload.current,
            total:action.payload.total,
            pageSize:action.payload.pageSize,
            keyword: action.payload.keyword
        })
    }
    if(action.type == types.PAGE_REQEST_START){
        return state.set('isFetching',true)
    }
    if(action.type == types.PAGE_REQEST_DONE){
        return state.set('isFetching',false)
    }
    if(action.type == types.SET_CATEGORIES){
        return state.set('categories',fromJS(action.payload))
    }
    if(action.type == types.SET_MAIN_IMAGE){
        return state.merge({
            mainImage:action.payload,
            mainImageValidateStatus:'',    
            mainImageHelp:'',              
        })
    }
    if(action.type == types.SET_IMAGES){
        return state.merge({
            'images':action.payload,
            imagesValidateStatus:'',    
            imagesHelp:'',              
        })
    }
    if(action.type == types.SET_DETAIL){
        return state.set('detail',action.payload)
    }
    if(action.type == types.SET_MAIN_IMAGE_ERROR){
        return state.merge({
            mainImageValidateStatus:'error',    
            mainImageHelp:'请上传封面图片',             
        })
    }
    if(action.type == types.SET_IMAGES_ERROR){
        return state.merge({
            imagesValidateStatus:'error',    
            imagesHelp:'请上传商品图片',             
        })
    }
    if(action.type == types.SET_PRODUCT_DETAIL){
        return state.merge({
            category:action.payload.category._id,
            categoryName:action.payload.category.name,
            name:action.payload.name,
            description:action.payload.description,
            price:action.payload.price,
            stock:action.payload.stock,
            detail:action.payload.detail,
            mainImage:action.payload.mainImage, 
            images:action.payload.images,
        })
    }         
    return state
}