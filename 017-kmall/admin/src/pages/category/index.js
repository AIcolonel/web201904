/*
 * @Author: TomChen
 * @Date:   2019-08-09 15:14:36
 * @Last Modified by:   TomChen
 * @Last Modified time: 2019-08-16 17:48:53
 */
import React, { Component } from 'react'
import { 
    Route, 
    Switch,
} from "react-router-dom"
import CategoryAdd from './add.js'
import CategoryList from './list.js'


import "./index.css"

class Category extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
           <Switch>
                <Route path="/category/add" component={CategoryAdd} />
                <Route path="/category/" component={CategoryList} />
           </Switch> 
        )
    }
}


export default Category