import React from 'react';
import { Route, Redirect, IndexRoute } from 'react-router';

import UserHome from '../module/user_home';
import UserInfo from '../module/user_home/user_info/index';
import UserInfoBase from '../module/user_home/user_info/base';
import {UserInfoSafe} from '../module/user_home/user_info/safe';

import Tender from '../module/user_home/tender/tender';
import {AllTender} from '../module/user_home/tender/all';
import {CheckingTender} from '../module/user_home/tender/checking';
import {CheckedTender} from '../module/user_home/tender/checked';

import {Enshrine} from '../module/user_home/enshrine/enshrine';





export default (
    <div>
        <Redirect from="/" to="user_info"/>
        <Route path="/" component={UserHome}>
            <Route path="user_info" component={UserInfo}>
                <IndexRoute component={UserInfoBase} />
                <Route path="safe" component={UserInfoSafe}></Route>
            </Route>
            <Route path="tender" component={Tender}>
                <IndexRoute component={AllTender} />
                <Route path="checking" component={CheckingTender}></Route>
                <Route path="checked" component={CheckedTender}></Route>
            </Route>
            <Route path="enshrine" component={Enshrine}></Route>
        </Route>
    </div>
);

