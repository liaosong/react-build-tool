import request from 'superagent';

export function updateUser(userInfo){
    return dispatch => {
        request
            .put('/api/users')
            .send(userInfo)
            .end(function(err, res){
                if(err){
                    return console.log(err);
                }

                if(res.body.status == 0){
                    dispatch({
                        type: 'USER_INFO_UPDATE',
                        currentUser: res.body.data
                    });
                }else{
                    dispatch({type:'UPDATE_USER_ERROR', message:res.body.message});
                }

            });
    }

}

export function updateView(){
    return dispatch =>{
        dispatch({
            type: 'UPDATE_VIEW'
        });
    }
}

export function showView(){
    return dispatch =>{
        dispatch({
            type: 'SHOW_VIEW'
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

export function pwdView(){
    return dispatch =>{
        dispatch({
            type: 'PWD_SHOW_VIEW'
        });
    }
}

export function getTenderData(){
    return dispatch => {
        request.get('/api/my_tenders')
            .end((err, res) => {
                if(err){
                    return console.log(err);
                }

                if(res.body.status == 0){
                    dispatch({
                        type: 'TENDER_INIT',
                        tenders: res.body.data
                    });
                }else{
                   console.log(res.body.message)
                }
            });
    }
}

export function removeTender(id){
    return dispatch => {
        request.del('/api/tenders/' + id)
            .end((err, res) => {
                if(err){
                    return console.log(err);
                }

                if(res.body.status == 0){
                    dispatch({
                        type: 'DELETE_TENDER',
                        tenderId: id
                    });
                }else{
                    console.log(res.body.message)
                }
            });
    }
}


