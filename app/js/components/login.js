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
                    height: '404px',
                    top: "calc(50% - 222px)",
                    left: "calc(50% - 150px)",
                    border: 'none'
                },
                overlay:{
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        };


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
        var {dispatch} = this.props;
        var loginText = this.props.loginText || '登陆';
        return (
            <div className="login-component">
                <a href="javascript:;" onClick={(e) => dispatch({type:'OPEN_LOGIN_DIALOG'})}>{loginText}</a>
                <Modal isOpen={this.props.dialogOpen} style={this.state.dialogStyle} onRequestClose={this.handleModalCloseRequest.bind(this)}>
                    <div className="login-container">
                        <div className="logo"></div>
                        <form method="POST" onSubmit={this.login.bind(this)} noValidate>
                            <input ref="phoneNumber" type="text" className="phone-number" onChange={this.checkPhoneNumber.bind(this)} defaultValue="18782972908"/>
                            <div className="tips">{this.state.phoneNumberTips}</div>
                            <input ref="password" type="password" className="password" onChange={this.checkPassword.bind(this)} defaultValue="liaosong1015"/>
                            <div className="tips">{this.state.passwordTips}</div>
                            <a href="" className="reset-password">忘记密码？</a>

                            <button type="submit">登陆</button>
                        </form>
                        <hr/>
                        <div className="reg-ref">
                            <span>还没有账号？</span>
                            <a href={this.props.registerUrl}>注册</a>
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
        dialogOpen: state.authService.dialogOpen
    }
}

export default connect(headerState)(Login);
