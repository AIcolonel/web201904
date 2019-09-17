/*
 * @Author: TomChen
 * @Date:   2019-08-09 15:14:36
 * @Last Modified by:   TomChen
 * @Last Modified time: 2019-08-21 15:34:47
 */
import React, { Component } from 'react'
import { 
    Route, 
    Switch,
} from "react-router-dom"
import ProductSave from './save.js'
import ProductDetail from './detail.js'
import ProductList from './list.js'


import "./index.css"

class Product extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
           <Switch>
                <Route path="/product/save/:productId?" component={ProductSave} />
                <Route path="/product/detail/:productId?" component={ProductDetail} />
                <Route path="/product/" component={ProductList} />
           </Switch> 
        )
    }
}


export default Product