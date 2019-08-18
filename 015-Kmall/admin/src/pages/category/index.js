import React,{Component,Fragment} from 'react';
import './index.css';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import AdminLayout from 'common/layout/index.js';

/*容器组件*/
class Category extends Component{
	render(){
		return (
			<div className="Category">
				<AdminLayout>
					Category page
				</AdminLayout>
			</div>
		)
	}
}

export default Category;