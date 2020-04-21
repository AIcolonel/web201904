<template>
    <div class="List">
        <Item 
            v-for="(todo,index) in todos"
            :todo="todo"
            :index="index"
            :key="index"
            :delTodo="delTodo"
        />
    </div>
</template>

<script>
    import Item from './Item.vue'
    export default {
        name:'List',
        props:{
            todos:Array,
            delTodo:Function
        },        
        components:{
            Item
        },
    }
</script>

<style>
  
</style>