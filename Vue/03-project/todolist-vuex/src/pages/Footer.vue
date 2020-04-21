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
	import { mapGetters } from 'vuex'
	import { SELECT_ALL_TODO,DELETE_ALL_DONE } from '../store/types.js'
	export default {
		name: 'Footer',
		computed:{
			/*
			total:function(){
				return this.$store.getters.total
			},
			totalDone:function(){
				return this.$store.getters.totalDone
			},
			*/
			// 使用对象展开运算符将 getter 混入 computed 对象中
		    ...mapGetters([
		      	'total',
		      	'totalDone',
		    ]),
			allDone:{
				get(){
					// return this.total == this.totalDone && (this.total != 0)
					return this.$store.getters.allDone
				},
				set(value){
					// this.selectAllTodo(value)
					this.$store.dispatch(SELECT_ALL_TODO,value)
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
					// this.delSelectDone()
					this.$store.dispatch(DELETE_ALL_DONE)
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