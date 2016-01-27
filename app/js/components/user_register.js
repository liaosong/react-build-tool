import React,{PropTypes} from 'react';
import { connect } from 'react-redux';
import request from 'superagent';



import {checkPhoneNumber, checkPassword, isPasswordsEqual, checkCode} from '../utils/validate';

import CodeButton from './code_button';

class UserRegister extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            phoneNumberTips:'',
            codeTips: '',
            passwordTips: '',
            passwordRefTips: '',
            captchaTips: '',
            captchaCorrect: false,
            captchaUrl: '/api/captcha.jpg'
        }
    }

    componentWillReceiveProps(nextProps){
        var {userType, error, message} = nextProps;
        if(userType){
            if(userType == 'company'){
                this.setState({
                    phoneNumberTips: '该手机号已经注册为服务商，请更换手机号码后再注册'
                });
            }else if(userType == 'exhibitor'){
                this.setState({
                    phoneNumberTips: '该手机号已经注册为参展商，您可以直接登录'
                });
            }else{
                this.setState({
                    phoneNumberTips: '该手机号已经注册,请更换手机号码后再注册'
                });
            }
        }

        if(error){
            if(error == 'code'){
                this.setState({
                    codeTips: message
                });
            }else if(error == 'captcha'){
                this.setState({
                    captchaTips: message
                });
            }
        }
    }

    changeCaptcha(){
        this.setState({
            captchaUrl: '/api/captcha.jpg?t=' + new Date().getTime()
        });
    }
    phoneNumberCheck(){
        let phoneNumber = this.refs.phoneNumber.value;
        let result = checkPhoneNumber(phoneNumber);
        if(result.res){
            this.setState({
                phoneNumberTips: ''
            });
        }else{
            this.setState({
                phoneNumberTips: result.message
            });
        }
        return result.res;
    }

    codeCheck(){
        let code = this.refs.code.value;
        let result = checkCode(code);
        if(result.res){
            this.setState({
                codeTips: ''
            });
        }else{
            this.setState({
                codeTips: result.message
            });
        }
        return result.res;

    }
    passwordCheck(){
        let password = this.refs.password.value;
        let result = checkPassword(password);
        if(result.res){
            this.setState({
                passwordTips: ''
            });
        }else{
            this.setState({
                passwordTips: result.message
            });
        }
        return result.res;

    }
    passwordRefCheck(){
        let password = this.refs.password.value;
        let passwordRef = this.refs.passwordRef.value;
        let result = isPasswordsEqual(password, passwordRef);
        if(result){
            this.setState({
                passwordRefTips: ''
            });
        }else{
            this.setState({
                passwordRefTips: '两次输入密码不一致'
            });
        }
        return result;
    }

    checkCaptcha(){
        var captcha = this.refs.captcha.value;
        if(!captcha){
            this.setState({
                captchaTips: '请输入验证码'
            });
        }

        request.post('/api/captcha_check')
            .send({captcha: captcha})
            .end((err, res) => {
                if(err){
                    return console.log(err);
                }

                if(res.body.status == 0){
                    this.setState({
                        captchaTips: '',
                        captchaCorrect: true
                    });
                }else{
                    this.setState({
                        captchaTips: '图形验证码错误',
                        captchaCorrect: false
                    });
                }
            });

    }

    userRegister(e){
        e.preventDefault();
        let {onRegister} = this.props;
        if(this.phoneNumberCheck() && this.codeCheck() && this.passwordCheck() && this.passwordRefCheck()){
            if(!this.state.captchaCorrect){
                this.setState({
                    captchaTips: '请输入正确的验证码'
                });
                return false;
            }

            onRegister({
                phone_number: this.refs.phoneNumber.value,
                password: this.refs.password.value,
                code: this.refs.code.value,
                captcha: this.refs.captcha.value
            });

        }
    }

    onGetCode(){
        let phoneNumber = this.refs.phoneNumber.value;
        let captcha = this.refs.captcha.value;
        let res = this.phoneNumberCheck();

        if(res && this.state.captchaCorrect) return {phone_number: phoneNumber, captcha: captcha};
        return false;
    }

    render(){
        return (
            <div className="user-register-container w-1000 s-center">
                <form onSubmit={this.userRegister.bind(this)}>
                    <div className="form-group">
                        <label htmlFor="phone_number">手机号</label>
                        <input type="text" className="row-input" ref="phoneNumber" onBlur={this.phoneNumberCheck.bind(this)} placeholder="请输入手机号"/>
                        <span className="err-tips">{this.state.phoneNumberTips}</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone_number">图形验证码</label>
                        <input type="text" className="part-row-input" ref="captcha" onBlur={this.checkCaptcha.bind(this)} placeholder="请输入图形验证码"/>
                        <img src={this.state.captchaUrl} alt="" className="inline captcha" onClick={this.changeCaptcha.bind(this)}/>
                        <span className="err-tips">{this.state.captchaTips}</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone_number">手机验证码</label>
                        <input type="text" className="part-row-input" ref="code" onBlur={this.codeCheck.bind(this)} placeholder="请输入手机验证码"/>
                        <CodeButton onGetCode={this.onGetCode.bind(this)}></CodeButton>
                        <span className="err-tips">{this.state.codeTips}</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone_number">设置密码</label>
                        <input type="password" className="row-input" ref="password" onBlur={this.passwordCheck.bind(this)} placeholder="请输入密码"/>
                        <span className="err-tips">{this.state.passwordTips}</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone_number">重新输入密码</label>
                        <input type="password" className="row-input" ref="passwordRef" onBlur={this.passwordRefCheck.bind(this)} placeholder="请重新输入密码"/>
                        <span className="err-tips">{this.state.passwordRefTips}</span>
                    </div>
                    <div className="submit-group">
                        <button type="submit">同意右侧协议并注册</button>

                        <a href="#">《神州会展服务协议》</a>
                    </div>

                </form>
            </div>
        );
    }
}

//export default UserRegister;

function store2props(state) {
    return {
        userType: state.register.userType,
        error: state.register.error,
        message: state.register.message
    }
}

export default connect(store2props)(UserRegister);
