import React,{Component,Fragment} from 'react';
import './index.css';
import AdminLayout from 'common/layout/index.js';
import { 
	Route,
	Switch,
	Link } 
from "react-router-dom";
import ProductAdd from './add.js';
import ProductSave from './save.js';

/*容器组件*/
class Product extends Component{
	render(){
		return (
			<div className="Product">
		        <Switch>
		       	 	<Route path='/product/add' component={ProductAdd} />
		       	 	<Route path='/product' component={ProductSave} />
		        </Switch>
			</div>
		)
	}
}

export default Product;