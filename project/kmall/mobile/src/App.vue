<!--模板-->
<template>
	<div id="App">
		<!-- 路由出口 -->
  		<!-- 路由匹配到的组件将渲染在这里 -->
  		<router-view></router-view>
  		<TabBar />
	</div>
</template>
<!--逻辑-->
<script>
	//1.引入组件
	import TabBar from './components/tab-bar/index.vue'


	export default {
		name: 'App',
		components: {
			TabBar,
		},
	}
</script>
<!--样式-->
<style lang="less">
	#App{
		
	}
</style>