import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { Provider } from 'react-redux';
import store from './store/index.js'

ReactDOM.render(
	<Provider store={store}>
        <App />
    </Provider>,
  	document.getElementById('root')
)
/*
function tick() {
  	const element = (
	    <div>
	      	<h1>Hello, world!</h1>
	      	<h2>It is {new Date().toLocaleTimeString()}</h2>
	    </div>
  	);
  	ReactDOM.render(
    	element,
    	document.getElementById('root')
  	);
}
setInterval(tick, 1000);
*/