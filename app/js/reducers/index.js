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
            return Object.assign({}, state, {registerType: 'user'});
        case 'COMPANY_REGISTER':
            return Object.assign({}, state, {currentUser: action.currentUser, step: 2, company: action.company});
        case 'COMPANY_FILL_INFO':
            return Object.assign({}, state, {company: action.company, step : 3});
        default: return state;
    }
}


const Index = combineReducers({
    authService,
    register
});

export default Index;