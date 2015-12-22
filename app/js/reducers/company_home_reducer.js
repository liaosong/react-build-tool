import { combineReducers } from 'redux';
import {authService} from './header_reducer';
import {routerStateReducer} from 'redux-router';
import CError from './error_reducer';
import _ from 'lodash';

function userHome(state, action){
    if(!state){
        return {
            currentUser: undefined,
            editing: false
        }
    }

    switch (action.type){
        case 'USER_REGISTER':
            return Object.assign({}, state, {registerType: 'user'});
        case 'COMPANY_REGISTER':
            return Object.assign({}, state, {currentUser: action.currentUser, step: 2, company: action.company});
        case 'COMPANY_FILL_INFO':
            return Object.assign({}, state, {company: action.company, step : 3});
        case 'USER_INFO_UPDATE':
            return {...state, currentUser: action.currentUser, editing: false};
        case 'UPDATE_VIEW':
            return {...state, editing: true};
        case 'SHOW_VIEW':
            return {...state, editing: false};
        case 'UPDATE_USER_ERROR':
            return {...state, errorMessage: action.message}
        case 'PWD_UPDATE_SUCCESS':
            return {...state, change: false};
        case 'PWD_UPDATE_FAIL':
            return {...state, change: true};
        case 'PWD_SHOW_VIEW':
            return {...state, change: false};
        case 'PWD_UPDATE_VIEW':
            return {...state, change: true};
        case 'TENDER_INIT':
            return {...state, tenders: action.tenders};
        case 'DELETE_TENDER':
            return {...state, tenders: _.filter(state.tenders, (item)=>{return item._id != action.tenderId})};
        case 'INIT_ENSHRINES':
            return {...state, enshrines: action.enshrines};
        case 'DELETE_ENSHRINES':
            return {...state, enshrines: _.filter(state.enshrines, (item)=>{return item._id != action.enshrineId})};
        default: return state;
    }
}

function companyHome(state, action){

    if(!state){
        return {};
    }

    switch (action.type){
        case 'COMPANY_UPDATE_VIEW':
            return {...state, editing: true};
        case 'COMPANY_SHOW_VIEW':
            return {...state, editing: false};
        case 'COMPANY_INFO_UPDATE':
            return {...state, company: action.company, editing: false};

        default : return state;
    }


}


const Index = combineReducers({
    authService: authService,
    userHome: userHome,
    cerror: CError,
    router: routerStateReducer,
    companyHome: companyHome
});

export default Index;