<!-- 模板 -->
<template>
    <div id="TabBar">
        <van-tabbar v-model="active">
		  	<van-tabbar-item
		  	icon="home-o"
			replace
    		to="/home"
		  	>
		  		首页
		  	</van-tabbar-item>
		  	<van-tabbar-item 
		  	icon="cart-o"
		  	replace
    		to="/cart"
		  	>
		  		购物车
			</van-tabbar-item>
		  	<van-tabbar-item 
		  	icon="friends-o"
		  	replace
    		to="/me"
		  	>
		  		个人中心
			</van-tabbar-item>
		  	<van-tabbar-item 
		  	icon="setting-o"
		  	>
		  		设置
			</van-tabbar-item>
		</van-tabbar>
    </div>
</template>

<!-- 逻辑 -->
<script>

//导出组件
export default {
    name: 'TabBar',
    data(){
	    return {
	      	active: 0
	    }
	}
}
</script>

<!-- 样式 -->
<style scoped>
	
</style>
