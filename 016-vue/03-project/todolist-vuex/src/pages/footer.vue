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
import { mapGetters } from 'vuex'
import { ALL_DONE,DEL_ALL_DONE } from '../store/types.js'
//导出组件
export default {
    name: 'Footer',
    props:{
    	todos:Array,
    },
    computed:{
        // 使用对象展开运算符将 getter 混入 computed 对象中
        ...mapGetters([
            'total',
            'totalDone',
        ]),
        allDone:{
            get(){
                /*
                return (this.total == this.totalDone) && (this.total != 0)
                */
                return this.$store.getters.allDone;
            },
            set(value){
                // this.handleAllDone(value)
                //派发action改变数据
                this.$store.dispatch(ALL_DONE,value)
            }
        }
        /*
        total(){
            return this.$store.getters.todos;
        },
        totalDone(){
            return this.$store.getters.todos.reduce((total,item)=>{
                if(item.done){
                    total = total + 1;
                }
                return total;
            },0)
        },
        */
    },
    methods:{
        handleDelAllDone(){
            if(window.confirm('是否要删除所选中的所有项?')){
                //派发action删除选中的所有选项
                this.$store.dispatch(DEL_ALL_DONE)
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
