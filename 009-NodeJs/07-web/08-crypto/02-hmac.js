/*
* @Author: Chen
* @Date:   2019-10-31 10:43:50
* @Last Modified by:   Chen
* @Last Modified time: 2019-10-31 10:49:19
*/
const crypto = require('crypto');


const hmac = crypto.createHmac('sha512','sdadasfasfasgag')


//对明文进行加密
hmac.update('12345')

//生成密文
console.log(hmac.digest('hex'))