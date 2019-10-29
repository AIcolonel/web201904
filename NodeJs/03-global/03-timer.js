/*
* @Author: Chen
* @Date:   2019-10-25 09:59:16
* @Last Modified by:   Chen
* @Last Modified time: 2019-10-25 10:04:27
*/

/*
const t1 = setTimeout(()=>{
	console.log('do t1...')
},100)
console.log('after t1')


const t2 = setInterval(()=>{
	console.log('do t2...')
},1000)
console.log('after t2')
*/

/*
const t1 = setTimeout(()=>{
	console.log('do t1...')
},40)
const t3 = setImmediate(()=>{
	console.log('do t3...')
})
console.log('after t1')
console.log('after t3')
*/

const t1 = setTimeout(()=>{
	console.log('do t1...')
},0)
const t3 = setImmediate(()=>{
	console.log('do t3...')
})
process.nextTick(()=>{
	console.log('do nextTick...')
})

console.log('after t3')
console.log('after nextTick')
