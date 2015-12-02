import React from 'react';
import ReactDom from 'react-dom';
import thunk from 'redux-thunk';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import IndexReducers from './reducers/index';
import Register from './module/register';
import { devTools, persistState } from 'redux-devtools';

const finalCreateStore = compose(
    // Enables your middleware:
    applyMiddleware(thunk), // any Redux middleware, e.g. redux-thunk
    // Provides support for DevTools:
    devTools()
    // Lets you write ?debug_session=<name> in address bar to persist debug sessions
    //persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

const store = finalCreateStore(IndexReducers);

var currentUser = undefined;

if(window.CURRENT_USER) {
    currentUser = window.CURRENT_USER;
}
let rootElement = document.getElementById('container');
ReactDom.render(
    <Provider store={store} >
        <Register currentUser={currentUser}/>
    </Provider>,
    rootElement
);
