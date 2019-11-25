/*
* @Author: Chen
* @Date:   2019-10-25 11:15:35
* @Last Modified by:   Chen
* @Last Modified time: 2019-10-25 11:20:02
*/
const EventEmitter = require('events')

/*
//生成事件触发器实例
const emitter = new EventEmitter()
//绑定事件
emitter.on('test',()=>{
	console.log('bind event .....')
})
//触发事件
emitter.emit('test')
*/
// console.log(EventEmitter)

class MyEmitter extends EventEmitter{

}
const emitter = new MyEmitter()
//绑定事件
emitter.on('test',()=>{
	console.log('bind event .....')
})
//触发事件
emitter.emit('test')