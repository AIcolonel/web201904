/*
* @Author: Chen
* @Date:   2019-11-21 10:36:54
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-27 10:39:06
*/
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

//自动生成html模板参数信息
const getHtmlConfig = (name,title)=>({
	template:'./src/views/'+name+'.html',//模板文件
    filename:name+'.html',//输出的文件名
    title:title,//配置文件title信息
    // inject:'head',//脚本写在那个标签里,默认是true(在body结束后)
    hash:true,//给生成的js/css文件添加一个唯一的hash
    chunks:['common',name]
})

module.exports = {
	//指定运行环境
	// mode: "production",
	mode: "development",

	// 这里应用程序开始执行
  	// webpack 开始打包
	//多入口
	entry:{
		'common':  					'./src/pages/common',
		'index': 					'./src/pages/index',
		'list': 					'./src/pages/list',
		'user-login': 				'./src/pages/user-login',
		'user-register': 			'./src/pages/user-register',
		'result': 					'./src/pages/result',
		'user-center': 				'./src/pages/user-center',
		'user-update-password': 	'./src/pages/user-update-password',
		'detail': 					'./src/pages/detail',
		'cart': 					'./src/pages/cart',
		'order-confirm': 			'./src/pages/order-confirm',
		'payment': 					'./src/pages/payment',
		'order-list': 				'./src/pages/order-list',
		'order-detail': 			'./src/pages/order-detail',
	},
	//输出
	output:{// webpack 如何输出结果的相关选项
		// 所有输出文件的目标路径
    	// 必须是绝对路径（使用 Node.js 的 path 模块）
		path: path.resolve(__dirname, "dist"), // string
		// 「入口分块(entry chunk)」的文件名模板（出口分块？）
		filename: "js/[name]-[hash]-bundle.js", // string
		//配置输出文件静态资源请求路径
		publicPath:'/'    
	},
	//配置别名
	resolve:{
        alias:{
            pages:path.resolve(__dirname,'./src/pages'),
            util:path.resolve(__dirname,'./src/util'),
            common:path.resolve(__dirname,'./src/common'),
            api:path.resolve(__dirname,'./src/api'),
            node_modules:path.resolve(__dirname,'./node_modules'),
        }
    },
	module: {
	    rules: [
	    	//处理css
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
	      	//处理图片资源
	      	{
	      		test: /\.(png|jpg|gif|eot|svg|ttf|woff2|woff)\??.*$/i,
				use: [
			  		{
			    		loader: 'url-loader',
			    			options: {
			      			limit: 400,
			      			name:'resource/[name].[ext]'
			    		}
			  		}
				]
	      	},
	      	//babel
	      	{
			    test:/\.js$/,
			    exclude: /(node_modules)/,
			    use: {
			        loader: 'babel-loader',
			        options: {
			            // presets: ['env', 'react'],
			            presets: ['env','es2015','stage-3'],
			        }
			    }               
			},
			//处理tpl
	      	{
			    test:/\.tpl$/,
			    use: {
			        loader: 'html-loader',
			    }               
			},
	    ]
	},


	plugins:[
		//自动清理多余文件
		new CleanWebpackPlugin(),
		//自动生成html文件
		/*
	    new htmlWebpackPlugin({
	        template:'./src/views/index.html',//模板文件
	        filename:'index.html',//输出的文件名
	        // inject:'head',//脚本写在那个标签里,默认是true(在body结束后)
	        hash:true,//给生成的js/css文件添加一个唯一的hash
	        chunks:['common','index']
	    }),
	    new htmlWebpackPlugin({
	        template:'./src/views/list.html',//模板文件
	        filename:'list.html',//输出的文件名
	        // inject:'head',//脚本写在那个标签里,默认是true(在body结束后)
	        hash:true,//给生成的js/css文件添加一个唯一的hash
	        chunks:['common','list']
	    }),
	    */
	    new htmlWebpackPlugin(getHtmlConfig('index','首页')),
	    new htmlWebpackPlugin(getHtmlConfig('list','列表页')),
	    new htmlWebpackPlugin(getHtmlConfig('user-login','登录页面')),
	    new htmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),
	    new htmlWebpackPlugin(getHtmlConfig('result','结果提示页')),
	    new htmlWebpackPlugin(getHtmlConfig('user-center','用户中心')),
	    new htmlWebpackPlugin(getHtmlConfig('user-update-password','更新密码')),
	    new htmlWebpackPlugin(getHtmlConfig('detail','商品详情')),
	    new htmlWebpackPlugin(getHtmlConfig('cart','购物车')),
	    new htmlWebpackPlugin(getHtmlConfig('order-confirm','订单确认')),
	    new htmlWebpackPlugin(getHtmlConfig('payment','支付页面')),
	    new htmlWebpackPlugin(getHtmlConfig('order-list','订单列表')),
	    new htmlWebpackPlugin(getHtmlConfig('order-detail','订单详情')),
	    //单独打包css文件
	    new MiniCssExtractPlugin({
	    	filename: "css/[name]-[hash]-bundle.css", // string
	    })
	],
	devServer: {
     	contentBase: './dist',
     	port:3002,
     	proxy: [{
	      	context: [
		      	'/sessions',
		      	'/users',
		      	'/categories',
		      	'/ads',
		      	'/floors',
		      	'/products',
		      	'/carts',
		      	'/orders',
		      	'/shippings',
		      	'/payments',
	      	],//地址以xx开头都代理到target下的地址
	      	target: 'http://127.0.0.1:3000',
	    }]
   	},
}