export default function CError(state, action){
    if(!state){
        return {

        }
    }
    switch (action.type){
        case 'ERROR-500':
            return {...state, code: 500};
        case 'ERROR-401':
            return {...state, code: 401};
        case 'ERROR-OTHERS':
            return {...state, message: action.message};
        default : return state;
    }
}
