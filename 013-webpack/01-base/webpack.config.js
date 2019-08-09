const path = require('path');

/*
webpack自身只支持JavaScript,
而loader能够让webpack处理那些非JavaScript文件
*/

module.exports = {
	//开发环境
	mode:'development',
	//入口文件
	//入口写法一
	// entry: './src/index.js',
	//入口写法二
	entry:{
		main:'./src/index.js',
		about:'./src/about.js',
		content:'./src/content.js'
	},
	//出口文件
	output: {
		//出口文件名
		filename: '[name]-[hash].bundle.js',
		//出口文件存放路径
		path: path.resolve(__dirname, 'dist')
	},
	module: {
	    rules: [
	    	//处理加载css文件
			{
				test: /\.css$/,
				use: [
				  	'style-loader',
				  	'css-loader'
				]
			},
			//处理图片 
			{
				test: /\.(png|jpg|gif|jpeg)$/i,
				use: [
			  		{
			    		loader: 'url-loader',
			    			options: {
			      			limit: 1000
			    		}
			  		}
				]
			}
	    ]
	}
};