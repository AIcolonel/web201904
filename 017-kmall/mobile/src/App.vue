<!-- 模板 -->
<template>
    <div id="app">
        <!-- 路由出口 -->
        <!-- 路由匹配到的组件将渲染在这里 -->
        <router-view></router-view>
        <TabBar />
    </div>
</template>

<!-- 逻辑 -->
<script>
//1.引入组件
import TabBar from './components/tab-bar/index.vue'

export default {
    name: 'App',
    //2.注册组件
    components: {
       TabBar
    },
    //传递数据
    data(){
        return {
            
        }
    },
    //注意点:本质上子组件是不能够操作父组件数据的,但是可以在父组件上定义一个方法传递给子组件,在子组件中调用该方法即可(原理和react一样)
    methods:{
        
    }
}
</script>

<!-- 样式 -->
<!-- 使用less预编译必须先安装对应包,然后style标签中加入lang="less" -->
<style scoped lang="less">
    #app{
        
    }
</style>
