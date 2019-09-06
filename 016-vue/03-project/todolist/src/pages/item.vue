<!-- 模板 -->
<template>
    <div 
    id="item"
    :style="{backgroundColor:bgc}"
    @mouseenter="show(true)"
    @mouseleave="show(false)"
    >
        <input type="checkbox" v-model='todo.done'>
        <span>{{todo.msg}}</span>
        <button 
            v-if="isShow"
            @click="handleDel()"
        >删除</button>
    </div>
</template>

<!-- 逻辑 -->
<script>

//导出组件
export default {
    name: 'Item',
    data(){
        return {
            bgc:'#fff',
            isShow:false
        }
    },
    methods:{
        show(flag){
            if(flag){
                this.bgc = '#ccc';
                this.isShow = flag;
            }else{
                this.bgc = '#fff';
                this.isShow = false;
            }
        },
        handleDel(){
            // console.log(this.index)
            if(window.confirm('你确定要删除'+this.todo.msg+'选项吗?')){
                this.delTodo(this.index)
            }
        }
    },
    props:{
        todo:Object,
        index:Number,
        delTodo:Function
    }
}
</script>

<!-- 样式 -->
<style scoped>
    #item{
        width: 100%;
        line-height: 40px;
        margin-top: 5px;
        border: 1px dashed #ccc;
        box-sizing: border-box;
    }
    button{
        float: right;
        margin-top: 8px;
        margin-right: 5px;
    }
</style>
