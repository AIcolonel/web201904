/*
* @Author: Chen
* @Date:   2019-12-02 09:30:34
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-16 09:58:54
*/
import React,{Component} from 'react'
import {actionCreators} from './store'
import {
  Switch,
  Route,
} from "react-router-dom";

import './index.css'
import ProductSave from './save.js'
import ProductDetail from './detail.js'
import ProductList from './list.js'


class Product extends React.Component {
	constructor(props){
		super(props)
	}
    render() {
        return (
        <div className="Product">
        	<Switch>
        		<Route exact path='/product/' component={ProductList} />
        		<Route path='/product/save/:productId?' component={ProductSave} />
                <Route path='/product/detail/:productId?' component={ProductDetail} />
        	</Switch>
		</div>
        );
    }
}


export default Product