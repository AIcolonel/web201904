/*
* @Author: Chen
* @Date:   2020-01-03 10:44:43
* @Last Modified by:   Chen
* @Last Modified time: 2020-01-07 15:59:44
*/
// vue.config.js

const path = require('path')
module.exports = {
	devServer: {
    	port: 3003,
        proxy: 'http://127.0.0.1:3000',
  	},
  	pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [
                path.resolve(__dirname, './src/assets/less/index.less')
            ]
        }
    },
    chainWebpack:config =>{
	    config.resolve.alias
	    .set('pages',path.resolve(__dirname,'./src/pages'))
	    .set('api',path.resolve(__dirname,'./src/api'))
	} 
}