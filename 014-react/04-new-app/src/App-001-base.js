import React,{Component,Fragment} from 'react';
import './index.css';
import Item from './Item.js';

class App extends Component{
	constructor(props){
		super(props);
		this.state={
			list:["电视","冰箱","洗衣机"],
			val:''
		}
	}
	handleAdd(){
		// console.log('handleAdd');
		this.setState({
			list:[...this.state.list,this.state.val],
			val:''
		})
	}
	handleChange(ev){
		// console.log(ev.target.value);
		this.setState({
			val:ev.target.value
		})
	}
	handleDelete(index){
		// console.log(index)
		const arr = [...this.state.list];
		arr.splice(index,1);
		// console.log(arr)
		this.setState({
			list:[...arr]
		})
	}
	render(){
		return( 
			//<div style={{background:'red'}}>
			<div className='App'>
				<input onChange={this.handleChange.bind(this)} value={this.state.val} />
				<button onClick={this.handleAdd.bind(this)}>新增</button>
				<ul>
					{	
						/*
						this.state.list.map((item,index)=>{
							return(
								<li 
									key={index}
									onClick={this.handleDelete.bind(this,index)}
								>
								{item}
								</li>
							) 
						})
						*/
						this.state.list.map((item,index)=>{
							return (
								<Item 
								key={index} 
								content={item} 
								handleDel={this.handleDelete.bind(this,index)}
							/>)
						})
					}
				</ul>
			</div>
		)
	}
}

export default App;