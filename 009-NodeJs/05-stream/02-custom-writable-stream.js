/*
* @Author: Chen
* @Date:   2019-10-28 09:51:11
* @Last Modified by:   Chen
* @Last Modified time: 2019-10-28 10:03:21
*/
const { Writable } = require('stream')
// console.log(Writable)

/*
const writer = new Writable() // _write() method is not implemented

writer.write('hello')
*/


//自定义可写流
class CustomWrite extends Writable{
	_write(chunk, encoding, callback){
		console.log('chunk::',chunk.toString())
		console.log('encoding::',encoding)
		callback()
	}
}

const writer = new CustomWrite()

//只有当调用了end方法才会触发finish事件
writer.on('finish',()=>{
	console.log('write done')
})

writer.write('hello','',()=>{
	console.log('after write hello')
})

writer.write('good')

//流写完后调用end方法
// writer.end('yes')