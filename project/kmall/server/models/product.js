/*
* @Author: TomChen
* @Date:   2018-08-04 17:14:00
* @Last Modified by:   TomChen
* @Last Modified time: 2019-08-21 09:56:46
*/
const mongoose = require('mongoose');
const pagination = require('../util/pagination.js');

const ProductSchema = new mongoose.Schema({
  category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Category'
  },
  detail:{
  	type:String
  },
  description:{
    type:String
  },
  mainImage:{
    type:String
  },
  images:{
    type:String
  },
  price:{
    type:Number
  }, 
  stock:{
    type:Number
  },
  name:{
    type:String
  },
  status:{
    type:String,
    default:'0'//0-下架 1-上架
  },     
  order:{
  	type:Number,
    default:0
  },
  isShow:{
      type: String,
      default: '0' //是在首页显示 0-不是 1-是
  },
  isHot: {
      type: String,
      default: '0' //是否热卖 0-不是 1-是
  },   
},{
  timestamps:true
});

ProductSchema.statics.getPaginationProducts = function(page,query={},projection='name _id price status order isShow isHot',sort={order:-1,_id:-1}){
    return new Promise((resolve,reject)=>{
      let options = {
        page: page,
        model:this, 
        query:query, 
        projection:projection,
        sort:sort, 
      }
      pagination(options)
      .then((data)=>{
        resolve(data); 
      })
    })
 }
const ProductModel = mongoose.model('Product', ProductSchema);

module.exports = ProductModel;