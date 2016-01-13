import { combineReducers } from 'redux';
import {authService} from './header_reducer';

function register(state, action){
    if(!state){
        return {
            registerType: 'user',
            currentUser: undefined,
            step: 2
        }
    }

    switch (action.type){
        case 'USER_REGISTER':
            return Object.assign({}, state, {registerType: 'user', userType: undefined, error: action.error, message: action.message});
        case 'COMPANY_REGISTER':
            return Object.assign({}, state, {currentUser: action.currentUser, step: 2, company: action.company});
        case 'COMPANY_FILL_INFO':
            return Object.assign({}, state, {company: action.company, step : 3});
        case 'USER_REGISTER_DUPLICATION_ERROR':
            return {...state, userType: action.userType, error: action.error, message: action.message};
        default: return state;
    }
}

function index(state, action){
    if(!state){
        return {homeData: {}};
    }

    switch (action.type){
        case 'INIT_INDEX_HOME':
            return {...state, homeData: action.homeData};
        case 'TENDER_CREATE_SUCCESS':
            return {...state, tenderCreate: true};
        default: return state;
    }
}


const Index = combineReducers({
    authService,
    register,
    index
});

export default Index;