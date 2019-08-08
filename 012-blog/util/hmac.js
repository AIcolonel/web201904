//加密算法
const crypto = require('crypto');

//1.根据算法生成hash对象
// const hash = crypto.createHash('md5');
// const hash = crypto.createHash('sha512');
//2.传入密码
// hash.update('test1');
//3.生成加密密码
// console.log(hash.digest('hex'));

//1.根据算法生成hmac对象
// const hmac = crypto.createHmac('md5');
// const hmac = crypto.createHmac('sha512','hello');
//2.传入密码
// hmac.update('test1');
//3.生成加密密码
// console.log(hmac.digest('hex'));

module.exports = (str)=>{
	//1.根据算法生成hmac对象
	const hmac = crypto.createHmac('sha512','hello');
	//2.传入密码
	hmac.update(str);
	//3.生成加密密码
    return hmac.digest('hex');
}