/*
* @Author: Chen
* @Date:   2019-11-25 10:45:25
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-28 10:39:00
*/
import React,{Component,Fragment} from 'react'
import { DatePicker,Button,Input,Row,Col,List   } from 'antd'
import './App.css'
import store from './store/index.js'
// import 'antd/dist/antd.css'
import {
	getChangeItemAction,
	getAddItemAction,
	getDelItemAction
} from './store/actionCreator.js'


class App extends Component{
	constructor(props){
		super(props)
		this.handleInput = this.handleInput.bind(this)
		this.handleAdd = this.handleAdd.bind(this)

		this.state = store.getState()
		//监听事件获取store中最新的数据
		store.subscribe(()=>{
			// console.log(store.getState())
			this.setState(store.getState())
		})
	}
	handleAdd(){
		//派发action
		/*
		const action = {
			type:ADD_ITEM
		}
		store.dispatch(action)
		*/
		store.dispatch(getAddItemAction())
	}
	handleInput(ev){
		const val = ev.target.value
		//派发action
		/*
		const action = {
			type:CHANGE_ITEM,
			payload:val
		}
		store.dispatch(action)
		*/
		store.dispatch(getChangeItemAction(val))
	}
	handleDelete(index){
		//派发action
		/*
		const action = {
			type:DEL_ITEM,
			payload:index
		}
		store.dispatch(action)
		*/
		store.dispatch(getDelItemAction(index))
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