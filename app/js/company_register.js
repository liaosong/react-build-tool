import React from 'react';
import ReactDom from 'react-dom';
import thunk from 'redux-thunk';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import Register from './module/company_register';
import CompanyRegReducer from './reducers/company_reg_reducer';
import { devTools, persistState } from 'redux-devtools';

const finalCreateStore = compose(
    // Enables your middleware:
    applyMiddleware(thunk), // any Redux middleware, e.g. redux-thunk
    // Provides support for DevTools:
    devTools()
    // Lets you write ?debug_session=<name> in address bar to persist debug sessions
    //persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);


var initData = {};
if(window.INIT_DATA) {
    initData = window.INIT_DATA;
}
const store = finalCreateStore(CompanyRegReducer, {companyRegister:{company: initData.company}, authService:{currentUser: initData.currentUser}});

let rootElement = document.getElementById('container');
ReactDom.render(
    <Provider store={store} >
        <Register initData={initData}/>
    </Provider>,
    rootElement
);
