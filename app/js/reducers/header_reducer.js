export function authService(state, action){
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
        case 'LOGIN_DIALOG_CLOSE':
            return Object.assign({}, state, {dialogOpen: false});
        default : return state;
    }
}
