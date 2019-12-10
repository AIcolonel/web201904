/*
* @Author: Chen
* @Date:   2019-11-25 10:45:25
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-29 15:35:48
*/
import React,{Component,Fragment} from 'react'
import {
	getChangeItemAction,
	getAddItemAction,
	getDelItemAction,
	getRequestInitDataAction
} from './store/actionCreator.js'
import { connect } from 'react-redux'
import { Button,Input,Row,Col,List   } from 'antd'
import './App.css'

class App extends Component{
	componentDidMount(){
		this.props.handleInit()
	}
	render(){
		const {handleInput,task,handleAdd,list,handleDelete} = this.props
		return (
			<div className="App">
				<Row>
					<Col span={18}>
						<Input 
							onChange={handleInput} 
							value={task} 
						/>
					</Col>
					<Col span={6}>
						<Button 
							type="primary"
							onClick={handleAdd}
						>
							提交
						</Button>
					</Col>
				</Row>
				<List
				  style={{marginTop:10}}
			      bordered
			      dataSource={list}
			      renderItem={(item,index) => (
			        <List.Item 
			        	onClick={()=>{handleDelete(index)}}
			        >
			          	{item}
			        </List.Item>
			      )}
			    />
			</div>
		)
	}
}

//将属性映射到组件
const mapStateToProps = (state)=>{
	return {
		task:state.task,
		list:state.list
	}
}
//将方法映射到组件
const mapDispatchToProps = (dispatch)=>{
	return {
		handleInput:(ev)=>{
			const val = ev.target.value
			dispatch(getChangeItemAction(val))
		},
		handleAdd:()=>{
			dispatch(getAddItemAction())
		},
		handleDelete:(index)=>{
			dispatch(getDelItemAction(index))
		},
		handleInit:()=>{
			dispatch(getRequestInitDataAction())
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(App)