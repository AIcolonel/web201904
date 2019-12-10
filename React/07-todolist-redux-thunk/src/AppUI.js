/*
* @Author: Chen
* @Date:   2019-11-25 10:45:25
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-29 09:48:55
*/
import React,{Component,Fragment} from 'react'
import { DatePicker,Button,Input,Row,Col,List   } from 'antd'
import './App.css'

//UI组件
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