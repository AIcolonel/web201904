/*
* @Author: Chen
* @Date:   2019-10-25 16:46:19
* @Last Modified by:   Chen
* @Last Modified time: 2019-10-25 16:51:28
*/
const EventEmitter = require('events')

class MyEmitter extends EventEmitter{

}
const emitter = new MyEmitter()

emitter.on('newListener',(eventName,callback)=>{
	console.log('execute newListener fn .')
	console.log(eventName)
	callback()
})

// emitter.emit('newListener')
emitter.on('test1',()=>{
	console.log('execute test1 fn .')
})
emitter.on('test2',()=>{
	console.log('execute test2 fn .')
})