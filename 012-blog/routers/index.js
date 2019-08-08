var express = require('express');
var router = express.Router();
const CategoryModel = require('../models/category.js');


router.get('/', (req, res) => {
	CategoryModel.find({},"name")
	.sort({order:1})
	.then(categories=>{
		res.render('main/index',{
			userInfo:req.userInfo,
			categories
		});
	})
	
});


module.exports = router;