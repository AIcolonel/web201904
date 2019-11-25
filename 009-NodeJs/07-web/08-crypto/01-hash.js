/*
* @Author: Chen
* @Date:   2019-10-31 10:43:50
* @Last Modified by:   Chen
* @Last Modified time: 2019-10-31 10:47:54
*/
const crypto = require('crypto');

// const hash = crypto.createHash('md5')
// const hash = crypto.createHash('sha256')
const hash = crypto.createHash('sha512')
//md5 =>不可逆


//对明文进行加密
hash.update('12345')

//生成密文
console.log(hash.digest('hex'))