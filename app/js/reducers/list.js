import { combineReducers } from 'redux';
import {authService} from './header_reducer';


function list(state, action){
    if(!state){
        return {companies: [], count: 0};
    }

    switch (action.type){
        case 'INIT_COMPANY_LIST_DATA':
            return {...state, companies: action.companies, count: action.count, query: action.query};
        default: return state;
    }
}


const List = combineReducers({
    authService,
    list
});

export default List;