/*
* @Author: Chen
* @Date:   2019-12-02 09:30:34
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-03 09:14:26
*/
import React,{Component,Fragment} from 'react'
import {actionCreators} from './store'
import { connect } from 'react-redux'
import { Button,Input,Row,Col,List   } from 'antd'
import './index.css'

class TodoList extends Component{
	componentDidMount(){
		// this.props.handleInit()
	}
	render(){
		const {handleInput,task,handleAdd,list,handleDelete} = this.props
		return (
			<div className="TodoList">
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
	// console.log(state)
	return {
		task:state.get('todolist').get('task'),
		list:state.get('todolist').get('list')
	}
}
//将方法映射到组件
const mapDispatchToProps = (dispatch)=>{
	return {
		handleInput:(ev)=>{
			const val = ev.target.value
			dispatch(actionCreators.getChangeItemAction(val))
		},
		handleAdd:()=>{
			dispatch(actionCreators.getAddItemAction())
		},
		handleDelete:(index)=>{
			dispatch(actionCreators.getDelItemAction(index))
		},
		handleInit:()=>{
			dispatch(actionCreators.getRequestInitDataAction())
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoList)