import { combineReducers } from 'redux';

function authService(state, action){
    if(!state){
        return {
            currentUser: undefined,
            dialogOpen: false
        }
    }
    switch (action.type){
        case 'INIT_AUTH':
            return Object.assign({}, state, {currentUser: action.currentUser, dialogOpen: false});
        case 'OPEN_LOGIN_DIALOG':
            return Object.assign({}, state, {dialogOpen: true});
        case 'LOGIN':
            return Object.assign({}, state, {currentUser: action.currentUser, errorMessage: '', dialogOpen: false});
        case 'LOGIN_ERROR':
            return Object.assign({}, state, {currentUser: undefined, errorMessage: action.message});
        case 'LOGOUT':
            return Object.assign({}, state, {currentUser: undefined});
        default : return state;
    }
}

function register(state, action){
    if(!state){
        return {
            registerType: 'user'
        }
    }

    switch (action.type){
        case 'USER_REGISTER':
            return Object.assign({}, state, {registerType: 'user'});
        default: return state;
    }
}

const Index = combineReducers({
    authService,
    register
});

export default Index;