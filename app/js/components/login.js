import React from 'react';
import classNames from 'classnames';
import Modal from 'react-modal';
import request from 'superagent';

import {login, logout} from '../actions/index_actions';
import { connect } from 'react-redux';

class Login extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            dialogStyle: {
                content:{
                    width: '280px',
                    height: '395px',
                    top: "calc(50% - 197px)",
                    left: "calc(50% - 140px)",
                    border: 'none',
                    overflow: 'hidden',
                    borderRadius: 'none',
                    boxShadow: '0px 1px 5px rgba(0,0,0,.3)'
                },
                overlay:{
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    overflowY: 'scroll',
                    width: '100%',
                    height: '100%',
                }
            }
        };


    }

    componentWillReceiveProps(nextProps){
        let {dialogOpen} = nextProps;

        this.toggleClass2body(dialogOpen);
    }

    toggleClass2body(open){
        var className = document.body.className;
        var classStr = 'modal-open';
        if(open){
            document.body.className = className.replace(new RegExp(classStr), '') + ' ' + classStr;
        }else{
            document.body.className = className.replace(new RegExp(classStr), '');
        }
    }




    checkPhoneNumber(){
        var phoneNumber = this.refs.phoneNumber.value;
        if(!phoneNumber){
            this.setState({
                phoneNumberTips: '手机号码不能为空'
            });
            return false;
        }
        if(!/1\d{10}/.test(phoneNumber.replace(' ', ''))){
            this.setState({
                phoneNumberTips: '请填写正确的手机号码'
            });
            return false;
        }

        this.setState({
            phoneNumberTips: ''
        });
        return true;
    }
    checkPassword(){
        var password = this.refs.password.value;
        if(!password){
            this.setState({
                passwordTips: '密码不能为空'
            });
            return false;
        }
        if(password.replace(' ', '').length < 6){
            this.setState({
                passwordTips: '请输入6-16位字符'
            });
            return false;
        }
        this.setState({
            passwordTips: ''
        });
        return true;
    }
    login(e){
        e.preventDefault();
        var phoneNumber = this.refs.phoneNumber.value;
        var password = this.refs.password.value;
        const { dispatch } = this.props;
        if(this.checkPassword(password) && this.checkPhoneNumber(phoneNumber)){
            dispatch(login({
                phone_number: phoneNumber,
                password: password
            }));
        }
        return false;
    }
    handleModalCloseRequest(){
        const { dispatch } = this.props;
        dispatch({
            type: 'LOGIN_DIALOG_CLOSE'
        });
    }

    render(){
        var {dispatch, errorMessage} = this.props;
        var loginText = this.props.loginText || '登录';

        return (
            <div className="login-component">
                <a href="javascript:;" onClick={(e) => dispatch({type:'OPEN_LOGIN_DIALOG'})}>{loginText}</a>
                <Modal isOpen={this.props.dialogOpen} style={this.state.dialogStyle} onRequestClose={this.handleModalCloseRequest.bind(this)}>
                    <div className="login-container">
                        <div className="logo"></div>
                        <p className="login-error">{errorMessage}</p>
                        <form method="POST" onSubmit={this.login.bind(this)} noValidate>
                            <input ref="phoneNumber" type="text" className="phone-number" onChange={this.checkPhoneNumber.bind(this)} placeholder="手机号码"/>
                            <div className="tips">{this.state.phoneNumberTips}</div>
                            <input ref="password" type="password" className="password" onChange={this.checkPassword.bind(this)} placeholder="密码"/>
                            <div className="tips">{this.state.passwordTips}</div>
                            <a href="/user/forget_password" className="reset-password">忘记密码？</a>

                            <button type="submit">登 录</button>
                        </form>
                        <hr/>
                        <div className="reg-ref">
                            <span>还没有账号？</span>
                            <a href="/user/register">注册</a>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

function headerState(state) {
    return {
        currentUser: state.authService.currentUser,
        dialogOpen: state.authService.dialogOpen,
        errorMessage: state.authService.errorMessage
    }
}

export default connect(headerState)(Login);
