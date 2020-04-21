<!--模板-->
<template>
	<div id="Item"
		:style="{backgroundColor:bgColor}"
		@mouseenter="handleShow(true)"
		@mouseleave="handleShow(false)"
	>
		<input type="checkbox" v-model="todo.done">
		<span>{{todo.task}}</span>
		<button v-if="isShow" @click="handleDel()">删除</button>
	</div>
</template>
<!--逻辑-->
<script>
	export default {
		name: 'Item',
		data(){
			return {
				bgColor:'#fff',
				isShow:false
			}
		},
		props:{
			todo:Object,
			index:Number,
			delTodo:Function
		},
		methods:{
			handleShow:function(flag){
				this.bgColor = flag ? '#ccc' : '#fff'
				this.isShow = flag
			},
			handleDel:function(){
				if(window.confirm('您确定要删除该任务吗?')){
					this.delTodo(this.index)
				}
			}
		},
	}
</script>
<!--样式-->
<style scoped>
	#Item{
		width: 100%;
		height: 34px;
		margin-top: 10px;
		line-height: 34px;
		border: 1px dashed #ccc;
	}
	input{
		vertical-align: middle;
	}
	button{
		margin-top: 5px;
		float: right;
	}
</style>