/*
* @Author: Chen
* @Date:   2019-11-25 10:45:25
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-27 16:39:50
*/
import React,{Component,Fragment} from 'react'
import { DatePicker,Button,Input,Row,Col,List   } from 'antd'
import './App.css'
import store from './store/index.js'
// import 'antd/dist/antd.css'


class App extends Component{
	constructor(props){
		super(props)
		/*
		this.state = {
			list:["吃饭","睡觉","打游戏"],
			task:''
		}
		*/
		this.handleInput = this.handleInput.bind(this)
		this.handleAdd = this.handleAdd.bind(this)

		this.state = store.getState()
		// console.log(store.getState())
	}
	handleAdd(){
		this.setState((preState)=>({
			list:[...preState.list,preState.task],
			task:''
		}))
	}
	handleInput(ev){
		const val = ev.target.value
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
	render(){
		return (
			<div className="App">
				<Row>
					<Col span={18}>
						<Input 
							onChange={this.handleInput.bind(this)} 
							value={this.state.task} 
						/>
					</Col>
					<Col span={6}>
						<Button 
							type="primary"
							onClick={this.handleAdd.bind(this)}
						>
							提交
						</Button>
					</Col>
				</Row>
				<List
				  style={{marginTop:10}}
			      bordered
			      dataSource={this.state.list}
			      renderItem={(item,index) => (
			        <List.Item 
			        	onClick={this.handleDelete.bind(this,index)}
			        >
			          	{item}
			        </List.Item>
			      )}
			    />
			</div>
		)
	}
}

export default App