/*
* @Author: TomChen
* @Date:   2018-08-04 17:14:00
* @Last Modified by:   Tom
* @Last Modified time: 2019-07-11 11:18:14
*/
const mongoose = require('mongoose');
const pagination = require('../util/pagination.js');

const AdSchema = new mongoose.Schema({
  image:{
  	type:String
  },
  link:{
    type:String
  },
  name:{
    type:String
  },
  position:{
    type:String,//1-首页轮播图
    default:"1"
  },
  order:{
    type:Number,
    default:0
  },  
  isShow:{
    type:String,
    enum:["0","1"],//0-显示 1-隐藏
    default:"0"    
  },
},{
  timestamps:true
});
AdSchema.statics.getPaginationAds = function(page,query={},projection='-__v -createdAt -updatedAt',sort={order:-1}){
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

const AdModel = mongoose.model('Ad', AdSchema);

module.exports = AdModel;