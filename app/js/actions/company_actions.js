import request from 'superagent';


export function updateView(){
    return dispatch =>{
        dispatch({
            type: 'COMPANY_UPDATE_VIEW'
        });
    }
}

export function showView(){
    return dispatch =>{
        dispatch({
            type: 'COMPANY_SHOW_VIEW'
        });
    }
}

export function changePassword(passInfo){
    return dispatch => {
        request.put('/api/change_password')
            .send(passInfo)
            .end((err, res) => {
                if(err){
                    return console.log(err);
                }

                if(res.body.status == 0){
                    dispatch({
                        type: 'PWD_UPDATE_SUCCESS'
                    });
                }else{
                    dispatch({type:'PWD_UPDATE_FAIL', message:res.body.message});
                }
            });
    }

}


export function pwdEdit(){
    return dispatch =>{
        dispatch({
            type: 'PWD_UPDATE_VIEW'
        });
    }
}


export function updateCompany(id, company){
    return dispatch => {
        request.put(`/api/companies/${id}`)
            .send(company)
            .end((err, res) => {
                if(err){
                    return console.log(err);
                }

                if(res.body.status == 0){
                    dispatch({
                        type: 'COMPANY_UPDATE_SUCCESS'
                    });
                }else{
                    return console.log(res.body.message);
                }
            });
    }

}
