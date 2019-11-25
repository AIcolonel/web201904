/*
* @Author: Chen
* @Date:   2019-11-11 10:49:17
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-11 11:06:34
*/
const crypto = require('crypto')

module.exports = (str)=>{
	const hmac = crypto.createHmac('sha512','safhasfhaslf')
	//加密数据
	hmac.update(str)
	//生成加密后的数据
	return hmac.digest('hex')
}