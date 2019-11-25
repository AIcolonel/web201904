/*
* @Author: Chen
* @Date:   2019-11-21 10:36:54
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-21 10:42:11
*/
const path = require('path')


module.exports = {
	//指定运行环境
	// mode: "production",
	mode: "development",

	// 这里应用程序开始执行
  	// webpack 开始打包
	entry: "./src/index.js", 

	//输出
	output:{// webpack 如何输出结果的相关选项
		// 所有输出文件的目标路径
    	// 必须是绝对路径（使用 Node.js 的 path 模块）
		path: path.resolve(__dirname, "dist"), // string


		// 「入口分块(entry chunk)」的文件名模板（出口分块？）
		filename: "bundle.js", // string    
	}
}