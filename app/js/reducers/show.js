import { combineReducers } from 'redux';
import {authService} from './header_reducer';


function companyShow(state, action){
    if(!state){
        return {company: {}, cases: [], quotations: [], comments: []};
    }

    switch (action.type){
        case 'INIT_STORE':
            return {...state, company: action.company};
        case 'LOAD_MORE_CASES':
            return {...state, cases: state.cases.concat(action.cases), caseCount: action.count};
        case 'LOAD_MORE_QUOTATIONS':
            return {...state, quotations: state.quotations.concat(action.quotations), quotationsCount: action.quotationsCount};
        case 'LOAD_MORE_COMMENTS':
            return {...state, comments: state.comments.concat(action.comments), commentCount: action.count};
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