import React,{Component,Fragment} from 'react';
import { Button,Input,Row, Col,List, Typography  } from 'antd';

/*
class AppUI extends Component{
	render(){
		return( 
			<div className='App'>
				<Row>
					<Col span={12}>
					<Input 
					ref={(input)=>{
						this.input = input;
					}} 
					onChange={this.props.handleChange} 
					value={this.props.val} 
					/>
					</Col>
					<Col span={12}>
					<Button type="primary" onClick={this.props.handleAdd} >新增</Button>
					</Col>
				</Row>
				<List
				  style={{marginTop:"10px"}}
			      size="small"
			      bordered
			      dataSource={this.props.list}
			      renderItem={(item,index) => <List.Item onClick={()=>{this.props.handleDelete(index)}}>{item}</List.Item>}
			    />
			</div>
		)
	}
}
*/
/*UI组件*/
const  AppUI = (props)=>{
	const { handleChange,val,handleAdd,list,handleDelete } = props;
	return( 
		<div className='App'>
			<Row>
				<Col span={12}>
				<Input 
				onChange={props.handleChange} 
				value={props.val} 
				/>
				</Col>
				<Col span={12}>
				<Button type="primary" onClick={props.handleAdd} >新增</Button>
				</Col>
			</Row>
			<List
			  style={{marginTop:"10px"}}
		      size="small"
		      bordered
		      dataSource={props.list}
		      renderItem={(item,index) => <List.Item onClick={()=>{props.handleDelete(index)}}>{item}</List.Item>}
		    />
		</div>
	)
}

export default AppUI;