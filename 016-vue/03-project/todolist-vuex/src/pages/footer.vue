<!-- 模板 -->
<template>
    <div id="footer">
        <input type="checkbox" v-model="allDone">
        <span>{{totalDone}}/{{total}}</span>
        <button @click="handleDelAllDone()">删除选中</button>
    </div>
</template>

<!-- 逻辑 -->
<script>

//导出组件
export default {
    name: 'Footer',
    props:{
    	todos:Array,
        handleAllDone:Function,
        delAllDone:Function
    },
    computed:{
        total(){
            return this.todos.length;
        },
        totalDone(){
            return this.todos.reduce((total,item)=>{
                if(item.done){
                    total = total + 1;
                }
                return total;
            },0)
        },
        allDone:{
            get(){
                return (this.total == this.totalDone) && (this.total != 0)
            },
            set(value){
                this.handleAllDone(value)
            }
        }
    },
    methods:{
        handleDelAllDone(){
            if(window.confirm('是否要删除所选中的所有项?')){
                this.delAllDone();
            }
        }
    }
}
</script>

<!-- 样式 -->
<style scoped>
    #footer{
        width: 100%;
        line-height: 80px;
    }
	button{
        float: right;
        margin-top: 35px;
        margin-right: 5px;
    }
</style>
