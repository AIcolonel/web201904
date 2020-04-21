<!--模板-->
<template>
	<div id="Message">
		<p>hello vue,{{task}}</p>
	</div>
</template>
<!--逻辑-->
<script>
	export default {
		name: 'Message',
		props:{
			task:String
		}
	}
</script>
<!--样式-->
<style scoped>
	p{
		color: red;
	}
</style>