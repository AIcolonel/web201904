<!--模版-->
<template>
    <div id="app">
        <!--3.使用组件-->
        <Header :addTodo="addTodo" />
        <List :todos="todos" :delTodo="delTodo" />
        <Footer 
            :todos="todos" 
            :selectAllTodo="selectAllTodo" 
            :delAllDone="delAllDone"
        />
    </div>
</template>

<!--逻辑-->
<script>
    //1.引入组件
    import Header from './pages/Header.vue'
    import List from './pages/List.vue'
    import Footer from './pages/Footer.vue'
    export default {
        name:'App',
        //2.注册组件
        components:{
            Header,
            List,
            Footer,
        },
        data(){
            return {
                todos:[
                    {
                        task:'吃饭',
                        done:true
                    },
                    {
                        task:'睡觉',
                        done:false
                    },                    
                ]
            }
        },
        methods:{
            addTodo(todo){
                this.todos.unshift(todo)
            },
            delTodo(index){
                this.todos.splice(index,1)
            },
            selectAllTodo(value){
                this.todos.forEach((item)=>{
                    item.done = value
                })
            },
            delAllDone(){
                this.todos = this.todos.filter(item=>!item.done)
            }
        }
    }
</script>

<!--样式-->
<style>
    #app{
        width: 600px;
        margin: 100px auto;
    }
</style>