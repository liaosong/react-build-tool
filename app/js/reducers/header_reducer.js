export function authService(state, action){
    if(!state){
        return {
            currentUser: undefined,
            dialogOpen: false
        }
    }
    switch (action.type){
        case 'INIT_AUTH':
            return {...state, currentUser: action.currentUser, dialogOpen: false}
        case 'OPEN_LOGIN_DIALOG':
            return {...state, dialogOpen: true};
        case 'LOGIN':
            return {...state, currentUser: action.currentUser, errorMessage: '', dialogOpen: false}
        case 'LOGIN_ERROR':
            return {...state, currentUser: undefined, errorMessage: action.message};
        case 'LOGOUT':
            return {...state, currentUser: undefined};
        case 'LOGIN_DIALOG_CLOSE':
            return  {...state, dialogOpen: false};

        default : return state;
    }
}
