/*
* @Author: Chen
* @Date:   2019-10-25 11:38:48
* @Last Modified by:   Chen
* @Last Modified time: 2019-10-25 11:41:23
*/
const EventEmitter = require('events')

class MyEmitter extends EventEmitter{

}
const emitter = new MyEmitter()

emitter.on('show',(arg1,arg2)=>{
	console.log('arg1::',arg1)
	console.log('arg2::',arg2)
})
emitter.on('show',(arg1,arg2)=>{
	console.log('always do something...')
})
// emitter.emit('show','aa','bb')
const args = ['aa','bb']
emitter.emit('show',...args)