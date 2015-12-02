import request from 'superagent';


export function login(user) {
    return dispatch => {
        request
            .post('/api/client/web_login')
            .send(user)
            .set('Accept', 'application/json')
            .end(function(err, res){
                if(err){
                    return console.log(err);
                }

                if(res.body.status == 0){
                    dispatch({
                        type: 'LOGIN',
                        currentUser: res.body.data.user
                    });
                }else{
                    dispatch({type:'LOGIN_ERROR', message:res.body.message});
                }

            });
    }
}

export function logout() {
    return dispatch => {
        request.get('/api/users/logout').end((err, res) => {
            if(err) return console.log(err);
            if(res.body.status == 0){
                dispatch({type:'LOGOUT'});
            }
        });
    }
}

export function userRegister(user){
    return dispatch => {
        request.post('/api/client/register')
            .send(user)
            .set('Accept', 'application/json')
            .end(function(err, res){
                if(err){
                    return console.log(err);
                }

                if(res.body.status == 0){
                    dispatch({
                        type: 'USER_REGISTER',
                        registerType: 'user'
                    });
                }
            });
    }
}

