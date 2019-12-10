/*
* @Author: Chen
* @Date:   2019-12-02 09:30:34
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-09 10:06:14
*/
import React,{Component} from 'react'
import {actionCreators} from './store'
import {
  Switch,
  Route,
} from "react-router-dom";

import './index.css'
import CategoryAdd from './add.js'
import CategoryList from './list.js'


class Category extends React.Component {
	constructor(props){
		super(props)
	}
    render() {
        return (
        <div className="Category">
        	<Switch>
        		<Route exact path='/category/' component={CategoryList} />
        		<Route path='/category/add' component={CategoryAdd} />
        	</Switch>
		</div>
        );
    }
}


export default Category