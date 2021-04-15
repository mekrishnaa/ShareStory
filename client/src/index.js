import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import  thunk  from 'redux-thunk';
import reducers from './reducers';
import './index.css';


import App from './App';

const Store = createStore(reducers, compose(applyMiddleware(thunk)));   // creating redux store for all our state,actions and reducers at one place.

ReactDom.render(
<Provider store = {Store}>  {/*it will make our Store available in the App component and all other component if any under the provider component */}
        <App/>
    </Provider>   
    ,document.getElementById('root'));