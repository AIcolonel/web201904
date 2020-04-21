<template>
    <div 
        class="Item"
        :style="{backgroundColor:bgColor}"
        @mouseenter="handleShow(true)" 
        @mouseleave="handleShow(false)" 
    >
        <input type="checkbox" v-model="todo.done">
        <span>{{todo.task}}</span>
        <button v-if="isShow" @click="handleDel()">删除</button>
    </div>
</template>

<script>
    export default {
        name:'Item',
        props:{
            todo:Object,
            index:Number,
            delTodo:Function
        },
        data(){
            return {
                bgColor:'#fff',
                isShow:false
            }
        },
        methods:{
            handleShow(flag){
                this.bgColor = flag ? '#ccc' : '#fff'
                this.isShow = flag
            },
            handleDel(){
                if(window.confirm('您确定要删除'+this.todo.task+'吗?')){
                    //console.log(this.index)
                    this.delTodo(this.index)
                }
            }
        }
    }
</script>

<style scoped>
    .Item{
        width: 100%;
        line-height: 40px;
        border: 1px dashed #ccc;
        margin-top: 10px;
    }
    input{
        float: left;
        margin-top: 14px;
        vertical-align: top;
    }
    button{
        float: right;
        margin-top: 14px;
        vertical-align: top;
    }
</style>