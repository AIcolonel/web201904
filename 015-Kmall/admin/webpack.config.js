const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
let {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
		main:'./src/index.js'
	},
	//出口文件
	output: {
		//出口文件名
		filename: '[name]-[hash].bundle.js',
		//输出路径
		publicPath:"/",
		//出口文件存放路径
		path: path.resolve(__dirname, 'dist')
	},
	//配置别名
    resolve:{
        alias:{
            pages:path.resolve(__dirname,'./src/pages'),
            util:path.resolve(__dirname,'./src/util'),
            api:path.resolve(__dirname,'./src/api'),
            common:path.resolve(__dirname,'./src/common'),
        }
    },
	module: {
	    rules: [
	    	//处理加载css文件
			{
	            test: /\.css$/,
	            use: [
	              {
	                	loader: MiniCssExtractPlugin.loader,
	                	options: {
	                	}
	              },
	              "css-loader"
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
			},
			//配置babel信息,可以使用react语法
			{
			    test:/\.js$/,
			    exclude: /(node_modules)/,
			    use: {
			        loader: 'babel-loader',
			        //antd样式预加载
			        options: {
			            presets: ['env','es2015','react','stage-3'],
			            plugins: [
						    ["import", {
						      "libraryName": "antd",
						      "libraryDirectory": "es",
						      "style": true // `style: true` 会加载 less 文件
						    }]
						]
			        }
			    }               
			},
			//配置UI主题
			{
				test: /\.less$/,
			    use: [
			    {
			      loader: 'style-loader',
			    }, 
			    {
			      loader: 'css-loader', // translates CSS into CommonJS
			    },
			    {
					loader: 'less-loader',
	     			options: {
	       				modifyVars: {
	         				'primary-color': '#1DA57A',
	        				'link-color': '#1DA57A',
	         				'border-radius-base': '2px',
	       				},
	       				javascriptEnabled: true,
	     			}
	     		}]
    		}
	    ]
	},
	//自动生成html
	plugins:[
		new HtmlWebpackPlugin({
		    template:'./src/index.html',//模板文件
		    filename:'index.html',//输出的文件名
		    inject:true,//脚本写在那个标签里,默认是true(在body结束后)
		    hash:true//给生成的js/css文件添加一个唯一的hash
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({})
	],
	//webpack-dev-server提供了一个简单的基于node express的web服务器,能够实时重新加载页面
	devServer:{
		contentBase: './dist',//内容的目录
		port:8080,//服务运行的端口
		historyApiFallback:true
	}
};