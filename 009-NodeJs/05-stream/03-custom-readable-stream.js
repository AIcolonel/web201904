/*
* @Author: Chen
* @Date:   2019-10-28 10:21:33
* @Last Modified by:   Chen
* @Last Modified time: 2019-10-28 10:32:08
*/
const {Readable} = require('stream')


/*
const reader = new Readable()

reader.on('data',(chunk)=>{
	console.log(chunk)// The _read() method is not implemented
})
*/


//传入的数据只能是字符串,buffer等不能是数字
class CustomReader extends Readable{
	constructor(){
		super()
		this.index = 0
	}
	_read(){
		this.index ++
		if(this.index > 5){
			this.push(null)
		}else{
			this.push(this.index+'')
		}
	}
}

const reader = new CustomReader()


/*
//读取数据过程
//1.初始化变量保存数据
let body = ''

//2.监听data事件
reader.on('data',(chunk)=>{
	body += chunk
})

//3.监听end事件
reader.on('end',()=>{
	console.log(body)
})
*/


//readable.pipe(writable) 将可读流的数据传递给可写流
reader.pipe(process.stdout)