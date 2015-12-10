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
            return Object.assign({}, state, {currentUser: action.currentUser, step: 2, company: action.company});
        case 'COMPANY_FILL_INFO':
            return Object.assign({}, state, {company: action.company, step : 3});
        default: return state;
    }
}


const Index = combineReducers({
    authService,
    companyRegister
});

export default Index;