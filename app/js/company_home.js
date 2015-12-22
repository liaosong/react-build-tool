import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import {configureStore} from './stores/company_home_store';
import { ReduxRouter } from 'redux-router';
import routes from './routes/company_routes';

import { Route, Redirect, IndexRoute } from 'react-router';
import CompanyHome from './module/company_home';


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
var initCompanyState = {
    company: window.COMPANY
}
let store = configureStore({
    authService: initAuthServiceState,
    userHome: initUserState,
    companyHome: initCompanyState
});
let rootElement = document.getElementById('container');

ReactDom.render(
    <Provider store={store} >
        <ReduxRouter>
            {routes}
        </ReduxRouter>
    </Provider>,
    rootElement
);
