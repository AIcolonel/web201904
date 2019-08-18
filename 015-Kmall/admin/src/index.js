import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { Provider } from 'react-redux';
import store from './store/index.js'
//整个入口文件
//Provider是管理store数据,使整个组件以及子组件能够拿到store数据

ReactDOM.render(
    <Provider store={store}>
    	<App />
    </Provider>,document.getElementById('root')
)
