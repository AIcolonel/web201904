const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
let {CleanWebpackPlugin} = require('clean-webpack-plugin');

/*
webpack自身只支持JavaScript,
而loader能够让webpack处理那些非JavaScript文件
*/
module.exports = {
	//开发环境
	mode:'development',
	//入口文件
	//入口写法二
	entry:{
		main:'./src/index/index.js',
		common:'./src/common/common.js'
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
	},
	//自动生成html
	plugins:[
		new HtmlWebpackPlugin({
		    template:'./src/view/index.html',//模板文件
		    filename:'index.html',//输出的文件名
		    inject:'head',//脚本写在那个标签里,默认是true(在body结束后)
		    hash:true//给生成的js/css文件添加一个唯一的hash
		}),
		new CleanWebpackPlugin()
	],
	//webpack-dev-server提供了一个简单的基于node express的web服务器,能够实时重新加载页面
	devServer:{
		contentBase: './dist',//内容的目录
		port:8080//服务运行的端口
	}
};