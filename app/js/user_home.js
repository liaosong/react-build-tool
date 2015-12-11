import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import {configureStore} from './stores/config_store';
import { ReduxRouter } from 'redux-router';


var USER;

if(window.CURRENT_USER) {
    USER = window.CURRENT_USER;
}

var initAuthServiceState = {
    dialogOpen: false,
    currentUser: USER
}

var initUserState = {
    currentUser: USER
}
let store = configureStore({
    authService: initAuthServiceState,
    userHome: initUserState
});
let rootElement = document.getElementById('container');


ReactDom.render(
    <Provider store={store} >
        <ReduxRouter></ReduxRouter>
    </Provider>,
    rootElement
);
