/*
* @Author: Chen
* @Date:   2019-10-25 11:48:54
* @Last Modified by:   Chen
* @Last Modified time: 2019-10-25 11:52:37
*/
const EventEmitter = require('events')

class MyEmitter extends EventEmitter{

}
const emitter = new MyEmitter()


const listener = ()=>{
	console.log('bind event show')
}
emitter.on('show',listener)
 
// emitter.off('show',listener)
// emitter.removeListener('show',listener)
console.log(emitter.off == emitter.removeListener)

emitter.emit('show')