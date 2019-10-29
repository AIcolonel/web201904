/*
* @Author: Chen
* @Date:   2019-10-25 10:43:14
* @Last Modified by:   Chen
* @Last Modified time: 2019-10-25 11:09:18
*/
//buffer就是一个用来存二进制数据的容器,用十六进制来存
//控制台中输出的buffer,一个数字或者字母代表两个十六进制数
const buf1 = Buffer.from('z')
console.log(buf1)//<Buffer 7a>
/*
	一个二进制的0 或者 1 代表了 1bit(位)
	8bit(位) = 1B(字节) = 2个16进制数
	1024B = 1K
	1024K = 1M
	1024M = 1G
	1024G = 1T
*/

//一个汉字表示3个字节
const buf2 = Buffer.from('好')
console.log(buf2)//<Buffer e5 a5 bd>

const buf3 = Buffer.alloc(10)
console.log(buf3)//<Buffer 00 00 00 00 00 00 00 00 00 00>

//会将10进制数转化为16进制数存到buff里面
buf3[0] = 10
console.log(buf3)//<Buffer 0a 00 00 00 00 00 00 00 00 00>

//0x后面跟的数据就是16进制数
buf3[1] = 0xff
console.log(buf3)

buf3[9] = 0xf5
console.log(buf3)

//超出buff长度则数据添加不进去
buf3[10] = 0xa5
console.log(buf3)

//知道16进制数可以转化成字符串
//e5 a5 bd 好
const buf4 = Buffer.alloc(3)
buf4[0] = 0xe5
buf4[1] = 0xa5
buf4[2] = 0xbd
console.log(buf4.toString())