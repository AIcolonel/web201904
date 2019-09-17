<!-- 模板 -->
<template>
    <div id="app">
        <!-- 使用组件      -->
        <Header />
        <Item 
            v-for='(todo,index) in this.$store.state.todos'
            :todo="todo"
            :index="index"
            :key="index"
        />
        <Footer 
            :todos="this.$store.state.todos" 
        />
    </div>
</template>

<!-- 逻辑 -->
<script>
//1.引入组件
import Header from './pages/header.vue'
import Item from './pages/item.vue'
import Footer from './pages/footer.vue'

export default {
    name: 'App',
    //2.注册组件
    components: {
        Header,
        Item,
        Footer
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
<style scoped>
    #app{
        width: 500px;
        margin: 50px auto;
    }
</style>
