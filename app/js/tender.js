import React from 'react';
import ReactDom from 'react-dom';
import thunk from 'redux-thunk';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import IndexReducers from './reducers/index';
import Tender from './module/tender';
//import { devTools, persistState } from 'redux-devtools';

//let store = createStore(IndexReducers);
const finalCreateStore = compose(
    // Enables your middleware:
    applyMiddleware(thunk) // any Redux middleware, e.g. redux-thunk
    // Provides support for DevTools:
    //devTools()
    // Lets you write ?debug_session=<name> in address bar to persist debug sessions
    //persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

const store = finalCreateStore(IndexReducers);

var initData = undefined;

if(window.INIT_DATA) {
    initData = window.INIT_DATA;
}else{
    location.href = '/';
}

let rootElement = document.getElementById('container');
ReactDom.render(
    <Provider store={store} >
        <Tender initData={initData}/>
    </Provider>,
    rootElement
);
