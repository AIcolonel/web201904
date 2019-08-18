import React,{Component,Fragment} from 'react';
import './index.css';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import AdminLayout from 'common/layout/index.js';

/*容器组件*/
class Product extends Component{
	render(){
		return (
			<div className="Product">
				<AdminLayout>
					Product page
				</AdminLayout>
			</div>
		)
	}
}

export default Product;