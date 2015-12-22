import React from 'react';
import { Route, Redirect, IndexRoute } from 'react-router';

import CompanyHome from '../module/company_home';
import CompanyInfo from '../module/company_home/info/index';
import CompanyInfoBase from '../module/company_home/info/base';
import CompanyInfoSafe from '../module/company_home/info/safe';

import Management from '../module/company_home/management/index';
import ManagementInfo from '../module/company_home/management/info';
import ManagementCase from '../module/company_home/management/cases';
import ManagementService from '../module/company_home/management/services';

import Collect from '../module/company_home/collect/index';


import { ReduxRouter } from 'redux-router';


export default (
    <ReduxRouter>
        <Redirect from="/" to="company_info"/>
        <Route path="/" component={CompanyHome}>
            <Route path="company_info" component={CompanyInfo}>
                <IndexRoute component={CompanyInfoBase}></IndexRoute>
                <Route path="safe" component={CompanyInfoSafe}></Route>

            </Route>
            <Route path="management" component={Management}>
                <IndexRoute component={ManagementInfo}></IndexRoute>
                <Route path="cases" component={ManagementCase}></Route>
                <Route path="services" component={ManagementService}></Route>
            </Route>
            <Route path="collect" component={Collect}></Route>
        </Route>
    </ReduxRouter>
);

