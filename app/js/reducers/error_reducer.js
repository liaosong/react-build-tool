export default function CError(state, action){
    if(!state){
        return {

        }
    }
    switch (action.type){
        case 'ERROR-500':
            return Object.assign({}, state, {code: 500});
        case 'ERROR-401':
            return Object.assign({}, state, {code: 401});
        case 'ERROR-OTHERS':
            return Object.assign({}, state, {message: action.message});
        default : return state;
    }
}
