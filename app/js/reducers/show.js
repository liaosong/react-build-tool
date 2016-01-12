import { combineReducers } from 'redux';
import {authService} from './header_reducer';


function companyShow(state, action){
    if(!state){
        return {company: {}, cases: [], quotations: [], comments: []};
    }

    switch (action.type){
        case 'INIT_STORE':
            return {...state, company: action.company};
        case 'INIT_CASES':
            return {...state, cases: action.cases};
        case 'INIT_QUOTATIONS':
            return {...state, quotations: action.quotations};
        case 'INIT_COMMENTS':
            return {...state, comments: action.comments};
        case 'ADD_COMMENT':
            return {...state, comments: [action.comment].concat(state.comments)};
        default: return state;
    }
}


const Show = combineReducers({
    authService,
    companyShow
});

export default Show;