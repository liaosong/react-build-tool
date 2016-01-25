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
        request.get(`/api/user/web_logout?t=${new Date().getTime()}`).end((err, res) => {
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
                }else if(res.body.status == 1){
                    dispatch({
                        type: 'USER_REGISTER_DUPLICATION_ERROR',
                        registerType: 'user',
                        userType: res.body.type,
                        error: res.body.error,
                        message: res.body.message
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
                        company: res.body.data.company
                    });

                    dispatch({
                        type: 'AUTH_INIT',
                        currentUser: res.body.data.user
                    });
                }else if(res.body.status == 1){
                    dispatch({
                        type: 'USER_REGISTER_DUPLICATION_ERROR',
                        registerType: 'user',
                        userType: res.body.type,
                        error: res.body.error,
                        message: res.body.message
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
                    var {fullCompany, factoryCompany, rentCompany} = res.body.data;
                    fullCompany = fullCompany.map((item) => {
                        return webAd2company(item);
                    });
                    factoryCompany = factoryCompany.map((item) => {
                        return webAd2company(item);
                    });
                    rentCompany = rentCompany.map((item) => {
                        return webAd2company(item);
                    });
                    dispatch({
                        type: 'INIT_INDEX_HOME',
                        homeData: {fullCompany, factoryCompany, rentCompany}
                    });
                }
            })
    }
}

function webAd2company(ad){
    var company = ad.company || {};
    return {...company, web_ad_img: ad.img_url}
}
