import React, {Component} from 'react';
import { connect } from 'react-redux';
import Header from '../components/header';
import Footer from '../components/footer';
import classNames from 'classnames';
import request from 'superagent';
import CodeButton from '../components/code_button';

class Wizard extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        var {step} = this.props;
        return (
            <div className="wizard-container">
                <ul className="apply-wizard cleanfix">
                    <li className={classNames('step', {'active': step == 1, 'node-complete': step > 1})}>
                        <div className={classNames('step-number', {'complete': step > 1})}>{step > 1 ? '': 1}</div>
                        <div className="step-name">验证身份</div>
                    </li>
                    <li className="line"></li>
                    <li className={classNames('step', {'active': step == 2, 'node-complete': step > 2})}>
                        <div className={classNames('step-number', {'complete': step > 2})}>{step > 2 ? '': 2}</div>
                        <div className="step-name">重置密码</div>
                    </li>
                    <li className="line"></li>
                    <li className={classNames('step', {'active': step == 3, 'node-complete': step > 3})}>
                        <div className={classNames('step-number', {'complete': step > 3})}>{step > 3 ? '': 3}</div>
                        <div className="step-name">完成</div>
                    </li>
                </ul>
            </div>
        )
    }
}


class Step1 extends Component{

    constructor(props){
        super(props);

        this.state = {
            captchaUrl: '/api/captcha.jpg',
            phoneTips: '',
            captchaTips: '',
            captchaRes: false,
            codeTips: ''
        }
    }

    checkPhoneNumber(){
        var {phoneNumber} = this.refs;
        if(/1\d{10}/.test(phoneNumber.value)){
            this.setState({
                phoneTips: ''
            });
            return true;
        }else{
            this.setState({
                phoneTips: '请填写正确的手机号'
            });
            return false;
        }
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
                        captchaRes: true
                    });
                }else{
                    this.setState({
                        captchaTips: '图形验证码错误',
                        captchaRes: false
                    });
                }
            });

    }


    changeCaptcha(){
        this.setState({
            captchaUrl: '/api/captcha.jpg?t=' + new Date().getTime()
        });
    }

    onGetCode(){
        var {phoneNumber, captcha} = this.refs;

        if(phoneNumber.value && captcha.value) return {phone_number: phoneNumber.value, captcha: captcha.value};
        return false;
    }

    checkCode(){
        var {code} = this.refs;
        if(/\d{6}/.test(code.value)){
            this.setState({
                codeTips: ''
            });
        }else{
            this.setState({
                codeTips: '短信验证码格式有误'
            });
        }
    }

    fillPhoneNumber(e){
        e.preventDefault();
        var {captcha, phoneNumber, code} = this.refs;
        var {onCheckSuccess} = this.props;

        if(this.checkPhoneNumber() && this.state.captchaRes){
            request.post('/api/users/web_check_user')
                .send({
                    phone_number: phoneNumber.value,
                    captcha: captcha.value,
                    code: code.value
                }).end((err, res) => {
                    if(err) return console.log(err);
                    if(res.body.status == 0){
                        onCheckSuccess({
                            step: 2,
                            phoneNumber: phoneNumber.value,
                            _id: res.body.data
                        });
                    }else if(res.body.status == 1){
                        if(res.body.error == 'phone_number') {
                            this.setState({
                                phoneTips: '账号不存在'
                            });
                        }else if(res.body.error == 'captcha'){
                            this.setState({
                                phoneTips: res.body.message
                            });
                        }else if(res.body.error == 'code'){
                            this.setState({
                                codeTips: '短信验证码有误'
                            });
                        }
                    }

                });
        }
    }

    render(){
        return (
            <form onSubmit={this.fillPhoneNumber.bind(this)} className="forget-password">
                <p className="title">为了您的账户安全，请完成身份验证</p>
                <div className="form-group">
                    <input type="text" className="form-control" ref="phoneNumber" onBlur={this.checkPhoneNumber.bind(this)} placeholder="请输入手机号"/>
                    <div className="error-tips">{this.state.phoneTips}</div>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control half-w" ref="captcha" onBlur={this.checkCaptcha.bind(this)} placeholder="请输入验证码"/>
                    <img src={this.state.captchaUrl} alt="" className="inline captcha" onClick={this.changeCaptcha.bind(this)}/>
                    <div className="error-tips">{this.state.captchaTips}</div>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control half-w" ref="code" placeholder="请输入短信验证码" onBlur={this.checkCode.bind(this)}/>
                    <CodeButton onGetCode={this.onGetCode.bind(this)}>获取验证码</CodeButton>
                    <div className="error-tips">{this.state.codeTips}</div>
                </div>

                <button type="submit" className="g-btn-primary">下一步</button>

            </form>
        );
    }
}


class Step2 extends Component{

    constructor(props){
        super(props);
        this.state = {
            phoneNumber: this.props.phoneNumber,
            passwordTips: '',
            passwordRepTips: '',
            backendTips: ''
        }
    }
    checkPassword(){
        var {password} = this.refs;
        if(password.value.length >=6 && password.value.length <= 16){
            this.setState({
                passwordTips: ''
            });
            return true;
        }else{
            this.setState({
                passwordTips: '密码长度应为6-16位'
            });
            return false;
        }
    }
    checkpasswordRep(){
        var {password, passwordRep} = this.refs;
        if(password.value === passwordRep.value){
            this.setState({
                passwordRepTips: ''
            });
            return true;
        }else{
            this.setState({
                passwordRepTips: '两次输入密码不一致'
            });
            return false;
        }
    }

    resetPassword(e){
        e.preventDefault();
        var {password} = this.refs;
        var {onCheckSuccess} = this.props;
        if(this.checkPassword() && this.checkpasswordRep()){
            request.post('/api/users/web_reset_password')
                .send({phone_number: this.state.phoneNumber, password: password.value})
                .end((err, res) => {
                    if(err) return console.log(err);

                    if(res.body.status == 0){
                        onCheckSuccess({
                            step: 3
                        })
                        this.setState({
                            backendTips: ''
                        });
                    }else{
                        this.setState({
                            backendTips: res.body.message
                        });
                    }
                })
        }
    }

    render(){
        return (
            <div className="step-two">
                <form onSubmit={this.resetPassword.bind(this)}>
                    <p className="title">您的账号是{this.state.phoneNumber}</p>
                    <p className="backend-tips">{this.state.backendTips}</p>
                    <div className="form-group">
                        <input type="password" className="form-control" ref="password" onBlur={this.checkPassword.bind(this)} placeholder="新密码"/>
                        <div className="error-tips">{this.state.passwordTips}</div>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" ref="passwordRep" onBlur={this.checkpasswordRep.bind(this)} placeholder="确认新密码"/>
                        <div className="error-tips">{this.state.passwordRepTips}</div>
                    </div>

                    <button type="submit" className="g-btn-primary">提 交</button>
                </form>
            </div>
        );
    }
}

class Step3 extends Component{

    onLogin(){
        var {login} = this.props;
        login()
    }

    render(){
        return (
            <div className="step">
                <p className="title">恭喜您！你的密码已重置成功！</p>
                <button type="button" className="g-btn-primary" onClick={this.onLogin.bind(this)}>立即登录</button>
            </div>
        );
    }
}

class ForgetPassword extends Component{

    constructor(props){
        super(props);

        this.state = {
            step: 1,
            phoneNumber: undefined,
            userId: undefined,

        }
    }
    onCheckSuccess(data){
        this.setState({
            step: data.step,
            phoneNumber: data.phoneNumber,
            userId: data._id
        });
    }

    login(){
        var {dispatch} = this.props;
        dispatch({
            type: 'OPEN_LOGIN_DIALOG'
        });

    }



    render(){

        var step;
        if(this.state.step == 1){
            step = <Step1 onCheckSuccess={this.onCheckSuccess.bind(this)}></Step1>
        }else if(this.state.step == 2){
            step = <Step2 onCheckSuccess={this.onCheckSuccess.bind(this)} phoneNumber={this.state.phoneNumber}></Step2>
        }else if(this.state.step == 3){
            step = <Step3 login={this.login.bind(this)}></Step3>
        }
        return(
            <div className="container">
                <Header></Header>
                <div className="fp-head">
                    <Wizard step={this.state.step}></Wizard>
                </div>

                <div className="fp-body">
                    {step}
                </div>
                <Footer></Footer>
            </div>
        );
    }
}

function store2props(state) {
    return state;
}

export default connect(store2props)(ForgetPassword);