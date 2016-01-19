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
            return {...state, registerType: 'user'}
        case 'COMPANY_REGISTER':
            return {...state, currentUser: action.currentUser, step: 2, company: action.company};
        case 'COMPANY_FILL_INFO':
            return {...state, company: action.company, step : 3};
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
            return {...state, change: true, errorMessage: action.message};
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
        case 'COMPANY_INFO_UPDATE_VIEW':
            return {...state, infoEdit: true};
        case 'COMPANY_INFO_SHOW_VIEW':
            return {...state, infoEdit: false};
        case 'COMPANY_UPDATE_SUCCESS':
            return {...state, infoEdit: false, company: action.company}
        case 'INIT_CASES':
            return {...state, cases: action.cases};
        case 'DELETE_CASE_SUCCESS':
            return {...state, cases: _.filter(state.cases, (item) => {return item._id != action.caseId})};
        case 'CASE_CREATE_SUCCESS':
            return {...state, cases: [action.caseObj, ...state.cases], caseDialogOpen: false};
        case 'CASE_PUT_SUCCESS':
            return {...state, caseDialogOpen: false, cases: state.cases.map((item) => {return item._id == action.caseId ? action.caseObj: item})}
        case 'INIT_SERVICES':
            return {...state, services: action.services};
        case 'DELETE_SERVICE_SUCCESS':
            return {...state, services: _.filter(state.services, (item) => {return item._id != action.serviceId})};
        case 'SERVICE_PUT_SUCCESS':
            return {...state, serviceDialogOpen: false, services: state.services.map((item) => {return item._id == action.serviceId ? action.service: item})};
        case 'SERVICE_CREATE_SUCCESS':
            return {...state, serviceDialogOpen: false, services: [action.service, ...state.services]};
        case 'INIT_TENDER':
            return {...state, tenders: action.tenders};
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