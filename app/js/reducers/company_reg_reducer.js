import { combineReducers } from 'redux';
import {authService} from './header_reducer';


function companyRegister(state, action){
    if(!state){
        return {
            currentUser: undefined,
            company: undefined,
            step: 2
        }
    }

    switch (action.type){
        case 'COMPANY_REGISTER':
            return Object.assign({}, state, {currentUser: action.currentUser, step: 2, company: action.company, userType: undefined, error: action.error, message: action.message});
        case 'COMPANY_FILL_INFO':
            return Object.assign({}, state, {company: action.company, step : 3});
        case 'USER_REGISTER_DUPLICATION_ERROR':
            return {...state, userType: action.userType, error: action.error, message: action.message};
        default: return state;
    }
}


const Index = combineReducers({
    authService,
    companyRegister
});

export default Index;