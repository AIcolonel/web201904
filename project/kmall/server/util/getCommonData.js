/*
* @Author: TomChen
* @Date:   2018-08-09 10:22:53
* @Last Modified by:   TomChen
* @Last Modified time: 2018-08-14 11:19:20
*/
const CategoryModel = require('../models/category.js');
const ArticleModel = require('../models/article.js');
const path = require('path');
const fs = require('fs');
/*
获取前台共通数据
*/
let getCommonData = ()=>{

	return new Promise((resolve,reject)=>{
		CategoryModel.find({},'_id name')
		.sort({order:1})
		.then(categories=>{
			ArticleModel.find({},'_id title click')
			.sort({click:-1})
			.limit(10)
			.then(topArticles=>{
				let filePath = path.normalize(__dirname + '/../site-info.json');
				fs.readFile(filePath,(err,data)=>{
					let site = {};
					if(!err){
						site = JSON.parse(data);
					}
					resolve({
						categories:categories,
						topArticles:topArticles,
						site:site
					})
				})
			})
		})
	});
}

module.exports = getCommonData;