/*
* @Author: TomChen
* @Date:   2019-08-08 16:30:19
* @Last Modified by:   TomChen
* @Last Modified time: 2019-08-28 16:18:13
*/

const path = require('path')

const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const getHtmlConfig = (name,title)=>({
    template:'./src/views/'+name+'.html',//模板文件
    filename:name+'.html',//输出的文件名
    title:title,
    hash:true,//给生成的js/css文件添加一个唯一的hash
    chunks:['common',name]
})

module.exports = {
    //指定环境
    mode:'development',
    //多入口
    entry:{
        'common'                :'./src/pages/common/index.js',
        'index'                 :'./src/pages/index/index.js',
        'list'                  :'./src/pages/list/index.js',
        'detail'                :'./src/pages/detail/index.js',
        'cart'                  :'./src/pages/cart/index.js',
        'order-confirm'         :'./src/pages/order-confirm/index.js',
        'payment'               :'./src/pages/payment/index.js',
        'user-login'            :'./src/pages/user-login/index.js',
        'user-register'         :'./src/pages/user-register/index.js',
        'result'                :'./src/pages/result/index.js',
        'user-center'           :'./src/pages/user-center/index.js',
        'user-update-password'  :'./src/pages/user-update-password/index.js',
        'order-list'            :'./src/pages/order-list/index.js',
        'order-detail'          :'./src/pages/order-detail/index.js',
    },
    //出口
    output: {
        filename: 'js/[name]-[hash]-bundle.js',
        //指定输出参考根路径
        publicPath:'/',
        //所有输出文件的目标路径
        path: path.resolve(__dirname, 'dist')
    },
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
        //处理css文件
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
        //bable
            {
                test:/\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env','es2015','stage-3'],
                    },
                }
            },
        //tpl
            {
                test:/\.tpl$/,
                use: {
                    loader: 'html-loader',
                }
            },                        
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),
        new htmlWebpackPlugin(getHtmlConfig('index','首页')),
        new htmlWebpackPlugin(getHtmlConfig('list','列表页')),        
        new htmlWebpackPlugin(getHtmlConfig('detail','商品详情页')),        
        new htmlWebpackPlugin(getHtmlConfig('cart','购物车')),        
        new htmlWebpackPlugin(getHtmlConfig('order-confirm','订单确认')),        
        new htmlWebpackPlugin(getHtmlConfig('payment','订单支付')),        
        new htmlWebpackPlugin(getHtmlConfig('user-login','用户登录')),        
        new htmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),        
        new htmlWebpackPlugin(getHtmlConfig('result','结果提示页')),        
        new htmlWebpackPlugin(getHtmlConfig('user-center','用户中心')),        
        new htmlWebpackPlugin(getHtmlConfig('user-update-password','修改密码')),        
        new htmlWebpackPlugin(getHtmlConfig('order-list','订单列表')),        
        new htmlWebpackPlugin(getHtmlConfig('order-detail','订单详情')),        
        new MiniCssExtractPlugin({
            filename: 'css/[name]-[hash]-bundle.css'
        })
    ],
    devServer: {
        contentBase: './dist',//内容的目录
        port:3002,//指定服务端口
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
                '/payments'
            ],
            target: 'http://127.0.0.1:3000',
        }]
    },                
}