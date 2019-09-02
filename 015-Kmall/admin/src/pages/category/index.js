import React,{Component,Fragment} from 'react';
import './index.css';
import { 
	Route,
	Switch,
	Link } 
from "react-router-dom";
import AdminLayout from 'common/layout/index.js';

import CategoryAdd from './add.js';
import CategoryList from './list.js';

/*容器组件*/
class Category extends Component{
	render(){
		return (
			<div className="Category">
		        <Switch>
		       	 	<Route path='/category/add' component={CategoryAdd} />
		       	 	<Route path='/category' component={CategoryList} />
		        </Switch>
			</div>
		)
	}
}

export default Category;