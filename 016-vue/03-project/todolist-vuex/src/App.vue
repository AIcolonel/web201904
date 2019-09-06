<!-- 模板 -->
<template>
    <div id="app">
        <!-- 使用组件      -->
        <Header :handleTodo="handleTodo" />
        <Item 
            v-for='(todo,index) in todos'
            :todo="todo"
            :index="index"
            :key="index"
            :delTodo="delTodo"
        />
        <Footer 
            :delAllDone="delAllDone" 
            :handleAllDone="handleAllDone" 
            :todos="todos" 
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
            todos:[
                {
                    msg:'看书',
                    done:true
                },
                {
                    msg:'学习',
                    done:false
                },
                {
                    msg:'打游戏',
                    done:false
                },
            ]
        }
    },
    //注意点:本质上子组件是不能够操作父组件数据的,但是可以在父组件上定义一个方法传递给子组件,在子组件中调用该方法即可(原理和react一样)
    methods:{
        //处理新增选项
        handleTodo(todo){
            this.todos.unshift(todo);
        },
        //处理删除选项
        delTodo(index){
            this.todos.splice(index,1);
        },
        //处理全选或全不选
        handleAllDone(boolean){
            this.todos.forEach((item)=>{
                item.done = boolean;
            })
        },
        //处理底部删除选中所有项按钮
        delAllDone(){
            //数组过滤筛选
            this.todos = this.todos.filter((item)=>{
                return item.done != true;
            })
        }
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
