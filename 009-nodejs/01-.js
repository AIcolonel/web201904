console.log(1)
setTimeout(()=>{
	console.log(2)
},200)
process.nextTick(()=>{
	console.log(3)
})
console.log(4)