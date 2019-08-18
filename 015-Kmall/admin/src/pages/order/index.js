import React,{Component,Fragment} from 'react';
import './index.css';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import AdminLayout from 'common/layout/index.js';

/*容器组件*/
class Order extends Component{
	render(){
		return (
			<div className="Order">
				<AdminLayout>
					Order page
				</AdminLayout>
			</div>
		)
	}
}

export default Order;