<!--模板-->
<template>
	<div id="Footer">
		<input type="checkbox" v-model="allDone">
		<span>{{totalDone}}/{{total}}</span>
		<button @click="handleDelSelectDone()">删除选中</button>
	</div>
</template>
<!--逻辑-->
<script>
	export default {
		name: 'Footer',
		computed:{
			total:function(){
				return this.todos.length
			},
			totalDone:function(){
				return this.todos.reduce((total,item)=>{
					if(item.done){
						total = total + 1
					}
					return total
				},0)
			},
			allDone:{
				get(){
					return this.total == this.totalDone && (this.total != 0)
				},
				set(value){
					this.selectAllTodo(value)
				}
			}
		},
		props:{
			todos:Array,
			selectAllTodo:Function,
			delSelectDone:Function
		},
		methods:{
			handleDelSelectDone:function(){
				if(window.confirm('您确定要删除选中的任务吗?')){
					this.delSelectDone()
				}
			}
		}
	}
</script>
<!--样式-->
<style scoped>
	#Footer{
		margin-top: 20px
	}
	button{
		float: right;
	}
</style>