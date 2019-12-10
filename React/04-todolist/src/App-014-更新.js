/*
* @Author: Chen
* @Date:   2019-11-25 10:45:25
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-27 10:38:21
*/
import React,{Component,Fragment} from 'react'
import './App.css'

import Item from './Item.js'

class App extends Component{
	constructor(props){
		console.log('App constructor')
		super(props)
		this.state = {
			list:["吃饭","睡觉","打游戏"],
			task:''
		}
		this.handleInput = this.handleInput.bind(this)
		this.handleAdd = this.handleAdd.bind(this)
	}
	static getDerivedStateFromProps(props, state){
		console.log('App getDerivedStateFromProps(props, state)::',props, state)
		//返回的对象和state合并生成新的state
		//如果不想返回具体值则返回null
		/*
		return {
			task:'aaa'
		}
		*/
		return null
	}
	shouldComponentUpdate(nextProps, nextState){
		//决定是否更新数据
		console.log('App shouldComponentUpdate(nextProps, nextState)::',nextProps, nextState)
		// return false
		if(nextState.task == 'l'){
			return false
		}else{
			return true
		}
	}
	getSnapshotBeforeUpdate(prevProps, prevState){
		//更新前保存具体的值并返回
		console.log('App getSnapshotBeforeUpdate(prevProps, prevState)::',prevProps, prevState)
		return 123
	}
	componentDidUpdate(prevProps, prevState,snapshot){
		//更新完毕
		console.log('App componentDidUpdate(prevProps, prevState,snapshot)::',prevProps, prevState,snapshot)
	}
	componentDidMount(){
		//一般用于整个组件加载渲染完毕后发送ajax
		console.log('App componentDidMount ')
	}
	handleAdd(){
		this.setState((preState)=>({
			list:[...preState.list,preState.task],
			task:''
		}),()=>{
			console.log(this.ul.childNodes)
		})
	}
	handleInput(ev){
		const val = this.input.value
		this.setState((preState) => ({
			task: val
		}))
	}
	handleDelete(index){
		const list = [...this.state.list]
		list.splice(index,1)
		this.setState((preState)=>({
			list:list
		}))
	}
	getItems(){
		return this.state.list.map((item,index)=>{
			return (
				<Item key={index} index={index} task={item} handleDel={this.handleDelete.bind(this,index)} />
			)
		})
	}
	render(){
		console.log('App render')
		return (
			<div className="App">
				<input 
					ref={(input)=>{this.input = input}}
					onChange={this.handleInput.bind(this)} 
					value={this.state.task} 
				/>
				<button className="btn" onClick={this.handleAdd.bind(this)}>提交</button>
				<ul className='list' ref={(ul)=>{this.ul = ul}}>
					{
						this.getItems()
					}
				</ul>
			</div>
		)
		
	}
}

export default App