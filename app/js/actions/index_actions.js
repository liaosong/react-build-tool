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
        request.post('/api/users/register')
            .send(user.user)
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

export function companyRegister(user){
    return dispatch => {
        request.post('/api/companies/register')
            .send(user)
            .set('Accept', 'application/json')
            .end(function(err, res){
                if(err){
                    return console.log(err);
                }

                if(res.body.status == 0){
                    dispatch({
                        type: 'COMPANY_REGISTER',
                        registerType: 'company',
                        currentUser: res.body.data.user,
                        company: res.body.data.company
                    });
                }
            });
    }
}

export function fillCompanyInfo(id, company){
    return dispatch => {
        request.put('/api/companies/' + id + '/fill_info')
            .send(company)
            .end(function(err, res){
                if(err){
                    return console.log(err);
                }

                if(res.body.status == 0){
                    dispatch({
                        type: 'COMPANY_FILL_INFO',
                        company: res.body.data
                    });
                }
            });
    }
}

export function initHomeData(){
    return dispatch => {
        request.get('/api/web_home')
            .end(function(err, res){
                if(err){
                    return console.log(err);
                }

                if(res.body.status == 0){
                    dispatch({
                        type: 'INIT_INDEX_HOME',
                        homeData: res.body.data
                    });
                }
            })
    }
}

