<!-- 模板 -->
<template>
    <div id="header" class="clearfix">
        <h1>todolist</h1>
    	<input 
    		type="text" 
    		:placeholder="prompt"
    		v-model="task"
    		@keyup.enter="handleAdd()"
    	>
    </div>
</template>

<!-- 逻辑 -->
<script>

//导出组件
import {ADD_TODO} from '../store/types.js'
export default {
    name: 'Header',
    data(){
    	return {
    		prompt:"请输入相关信息",
    		task:''
    	}
    },
    props:{
    	
    },
    methods:{
    	handleAdd(){
    		//1.校验数据
    		const val = this.task.trim()
    		if(!val){
    			alert('请输入新增信息')
    			return 
    		}
    		//2.生成数据对象
    		const todo = {
    			msg:val,
    			done:false
    		}
    		//3.将数据对象插入到顶层App数据数组中
            //派发action到store中
            this.$store.dispatch(ADD_TODO,todo);
    		//4.清空输入框
    		this.task = ''
    	}
    }
}
</script>

<!-- 样式 -->
<style scoped>
	.clearfix:after{
		clear: both;
		display: block;
		content: "";
		height: 0;
		visibility: hidden;
	}
	.clearfix{
		*zoom: 1;
	}
	h1{
		font-size: 20px;
		text-align:center;
	}
	input{
		float: left;
		width: 100%;
		height: 30px;
		padding-left: 10px;
		box-sizing: border-box;
		outline: none;
	}
</style>
