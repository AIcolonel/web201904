/*
* @Author: Chen
* @Date:   2019-11-25 10:45:25
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-28 15:15:23
*/
import React,{Component,Fragment} from 'react'
import { DatePicker,Button,Input,Row,Col,List   } from 'antd'
import './App.css'

//UI组件
/*
class AppUI extends Component{
	render(){
		return (
			<div className="App">
				<Row>
					<Col span={18}>
						<Input 
							onChange={this.props.handleInput} 
							value={this.props.task} 
						/>
					</Col>
					<Col span={6}>
						<Button 
							type="primary"
							onClick={this.props.handleAdd}
						>
							提交
						</Button>
					</Col>
				</Row>
				<List
				  style={{marginTop:10}}
			      bordered
			      dataSource={this.props.list}
			      renderItem={(item,index) => (
			        <List.Item 
			        	onClick={()=>{this.props.handleDelete(index)}}
			        >
			          	{item}
			        </List.Item>
			      )}
			    />
			</div>
		)
	}
}
*/
const AppUI = (props)=>{
	const {handleInput,task,handleAdd,list,handleDelete} = props
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

export default AppUI