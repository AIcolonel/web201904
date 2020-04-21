/*
* @Author: Chen
* @Date:   2019-12-16 11:20:13
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-20 10:18:49
*/
//引入common中逻辑
var nav = require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
//这种方式不可行
// var Swpier = require('swiper')
import Swiper from 'swiper'

require('node_modules/swiper/css/swiper.min.css')
require('./index.css')
var categoriesTpl = require('./categories.tpl')
var swiperTpl = require('./swiper.tpl')
var floorsTpl = require('./floor.tpl')

var api = require('api')
var _util = require('util')

var page = {
	init:function(){
		this.loadHomeCategories()
		this.loadSwiper()
		this.loadFloors()
	},
	loadHomeCategories:function(){
		api.getHomeCategories({
			success:function(categories){
				var html = _util.render(categoriesTpl,{
					categories:categories
				})
				$('.categories').html(html)
			}
		})
	},
	loadSwiper:function(){
		/*
		var mySwiper = new Swiper ('.swiper-container', {
		    loop: true, // 循环模式选项
		    autoplay:true,//自动切换
		    
		    // 如果需要分页器
		    pagination: {
		      el: '.swiper-pagination',
		      //点击底部按钮切换
		      clickable :true
		    },
		    
		    // 如果需要前进后退按钮
		    navigation: {
		      nextEl: '.swiper-button-next',
		      prevEl: '.swiper-button-prev',
		    },
		}) 
		*/

		api.getHomeAds({
			data:{
				position:1
			},
			success:function(data){
				// console.log(data)
				var html = _util.render(swiperTpl,{
					slides:data
				})
				$('.swiper-container .swiper-wrapper').html(html)

				//必须等到轮播图结构构建完毕后再集成swiper
				var mySwiper = new Swiper ('.swiper-container', {
				    loop: true, // 循环模式选项
				    autoplay:true,//自动切换
				    
				    // 如果需要分页器
				    pagination: {
				      el: '.swiper-pagination',
				      //点击底部按钮切换
				      clickable :true
				    },
				    
				    // 如果需要前进后退按钮
				    navigation: {
				      nextEl: '.swiper-button-next',
				      prevEl: '.swiper-button-prev',
				    },
				}) 
			}
		})
	},
	loadFloors:function(){
		api.getHomeFloors({
			success:function(data){
				// console.log(data)
				var html = _util.render(floorsTpl,{
					floors:data
				})
				$('.floor .floor-wrap').html(html)
			}
		})
	}
}

$(function(){
	page.init()
})