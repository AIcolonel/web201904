import React,{Component,Fragment} from 'react';
import './index.css';
import Item from './Item.js';

class App extends Component{
	constructor(props){
		console.log('constructor render ....')
		super(props);
		this.state={
			list:["电视","冰箱","洗衣机"],
			val:''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
	}
	static getDerivedStateFromProps(nextProps, prevState){
		console.log(prevState);
		return {
			list:['睡觉']
		}
	}
	componentDidMount(){
		console.log('componentDidMount done ..... ')
	}
	handleAdd(){
		//是一个异步过程
		this.setState((preState)=>({
			list:[...preState.list,preState.val],
			val:''
		}),()=>{
			console.log(this.ul.querySelectorAll('li'));
		});
	}
	handleChange(ev){
		let val = this.input.value;
		this.setState(()=>({
			val
		}))
	}
	handleDelete(index){
		const arr = [...this.state.list];
		arr.splice(index,1);
		this.setState({
			list:[...arr]
		})
	}
	getItem(){
		return this.state.list.map((item,index)=>{
			return (
				<Item 
				key={index} 
				content={item}
				handleDel={this.handleDelete.bind(this,index)}
			/>)
		})
	}
	render(){
		console.log('App render.......')
		return( 
			<div className='App'>
				<input 
				ref={(input)=>{
					this.input = input;
				}} 
				onChange={this.handleChange} 
				value={this.state.val} 
				/>
				<button onClick={this.handleAdd}>新增</button>
				<ul 
				ref={(ul)=>{
					this.ul = ul;
				}}>
					{	
						this.getItem()
					}
				</ul>
			</div>
		)
	}
}

export default App;