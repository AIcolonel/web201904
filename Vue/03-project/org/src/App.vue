<!--模板-->
<template>
	<div id="app">
		<!-- <img src="./assets/images/logo.png" alt=""> -->
		<Logo />
		<Message task="学习" />
		<p>this is home page</p>
	</div>
</template>
<!--逻辑-->
<script>
	//1.引入组件
	import Logo from './pages/Logo.vue'
	import Message from './pages/Message.vue'


	export default {
		name: 'App',
		components: {
			Logo,
			Message
		}
	}
</script>
<!--样式-->
<style>
	
</style>