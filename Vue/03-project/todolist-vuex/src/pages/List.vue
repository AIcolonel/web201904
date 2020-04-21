<!--模板-->
<template>
	<div id="List">
		<Item 
			v-for="(todo,index) in this.$store.state.todos"
			:todo="todo"
			:key="index"
			:index="index"
			:delTodo="delTodo"
		/>
	</div>
</template>
<!--逻辑-->
<script>
	import Item from './Item.vue'
	export default {
		name: 'List',
		components:{
			Item
		},
		//接收数据
		props:{
			todos:Array,
			delTodo:Function
		}
	}
</script>
<!--样式-->
<style scoped>
	
</style>