/*
* @Author: Chen
* @Date:   2019-10-25 11:25:11
* @Last Modified by:   Chen
* @Last Modified time: 2019-10-25 11:34:55
*/
const EventEmitter = require('events')

class MyEmitter extends EventEmitter{

}
const emitter = new MyEmitter()

/*
//1.on监听事件
emitter.on('test',()=>{
	console.log('bind event test1')
})


//2.addlistener监听事件
emitter.on('test',()=>{
	console.log('bind event test2')
})
*/


emitter.emit('test')
emitter.emit('test')
emitter.emit('test')

//3.once监听事件
/*
emitter.once('test',()=>{
	console.log('bind event test3')
})
emitter.emit('test')
emitter.emit('test')
emitter.emit('test')
*/


//emitter.addListener和emitter.on(eventName, listener)是同一个方法
// console.log(emitter.on == emitter.addListener)


emitter.setMaxListeners(20)
emitter.on('test',()=>{
	console.log('bind event test1')
})
emitter.on('test',()=>{
	console.log('bind event test2')
})
emitter.on('test',()=>{
	console.log('bind event test3')
})
emitter.on('test',()=>{
	console.log('bind event test4')
})
emitter.on('test',()=>{
	console.log('bind event test5')
})
emitter.on('test',()=>{
	console.log('bind event test6')
})
emitter.on('test',()=>{
	console.log('bind event test7')
})
emitter.on('test',()=>{
	console.log('bind event test8')
})
emitter.on('test',()=>{
	console.log('bind event test9')
})
emitter.on('test',()=>{
	console.log('bind event test10')
})
emitter.on('test',()=>{
	console.log('bind event test11')
})

emitter.emit('test')