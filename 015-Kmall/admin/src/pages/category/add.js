import React,{Component,Fragment} from 'react';
import './index.css';
import { actionCreaters } from './store/index.js';
import { connect } from 'react-redux';
import AdminLayout from 'common/layout/index.js';
import {
  Breadcrumb,
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';
const { Option } = Select;

/*容器组件*/
class CategoryAdd extends Component{
	constructor(props){
		super(props);
		
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	componentDidMount(){
		this.props.handleCategory();
	}
	handleSubmit (e){
    	e.preventDefault();
    	this.props.form.validateFields((err, values) => {
    		
      		if (!err) {
				this.props.handleAdd(values);
      		}
    	});
  	}
	render(){
		const { getFieldDecorator } = this.props.form;
		const { isAddLoading,levelCategories } = this.props;
		const formItemLayout = {
	      labelCol: {
	        xs: { span: 24 },
	        sm: { span: 8 },
	      },
	      wrapperCol: {
	        xs: { span: 24 },
	        sm: { span: 6 },
	      },
	    };
	    const tailFormItemLayout = {
	      wrapperCol: {
	        xs: {
	          span: 24,
	          offset: 0,
	        },
	        sm: {
	          span: 16,
	          offset: 8,
	        },
	      },
	    };
		return (
			<div className="CategoryAdd">
				<AdminLayout>
					<Breadcrumb style={{ margin: '16px 0' }}>
			          <Breadcrumb.Item>首页</Breadcrumb.Item>
			          <Breadcrumb.Item>分类管理</Breadcrumb.Item>
			          <Breadcrumb.Item>添加分类</Breadcrumb.Item>
			        </Breadcrumb>
			        <Form {...formItemLayout}>
			        	<Form.Item label="根分类">
				          {getFieldDecorator('pid', {
				            rules: [
				              {
				                required: true,
				                message: '请选择根分类!',
				              },
				            ],
				          })(<Select autoComplete='off' placeholder="根分类" style={{ width: 300 }}>
						        <Option value="0">根分类</Option>
						        {
						        	// console.log(levelCategories)
						        	levelCategories.map(category=>{
						        		return <Option key={category.get('_id')} value={category.get('_id')}>根分类{category.get('name')}</Option>
						        	})
						        }
						      </Select>,)}
				        </Form.Item>
			        	<Form.Item label="分类名称">
				          {getFieldDecorator('name', {
				            rules: [
				              {
				                required: true,
				                message: '请输入分类名称!',
				              },
				            ],
				          })(<Input autoComplete='off' style={{minWidth:300}} placeholder="分类名称" />)}
				        </Form.Item>
				        <Form.Item label="手机分类名称">
				          {getFieldDecorator('mobileName', {
				            rules: [
				              {
				                required: true,
				                message: '请输入手机分类名称!',
				              },
				            ],
				          })(<Input autoComplete='off' style={{minWidth:300}} placeholder="手机分类名称" />)}
				        </Form.Item>
				        <Form.Item {...tailFormItemLayout}>
				          <Button 
				          type="primary"
				          loading={isAddLoading}
				          onClick = {this.handleSubmit}
				          >
				            提交
				          </Button>
				        </Form.Item>
			        </Form>
				</AdminLayout>
			</div>
		)
	}
}

const mapStateToProps = (state)=>{
	return {
		isAddLoading:state.get('category').get('isAddLoading'),
		levelCategories:state.get('category').get('levelCategories')
	}
}

const mapDispatchToProps = (dispatch)=>{
	return {
		handleAdd:(values)=>{
			//派发一个登陆的action
			const action = actionCreaters.getAddAction(values);
			//其实这个action就是一个可以发送ajax的函数
			//action原本是不可以返回一个函数的只能够返回对象,但是安装了redux-thunk就可以返回函数
			dispatch(action);
		},
		handleCategory:()=>{
			const action = actionCreaters.getLevelCategoriesAction();
			dispatch(action);
		}
	}
}

const WrappedCategoryAdd = Form.create()(CategoryAdd);

export default connect(mapStateToProps,mapDispatchToProps)(WrappedCategoryAdd);