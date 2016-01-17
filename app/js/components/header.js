import React from 'react';
import classNames from 'classnames';
import Modal from 'react-modal';
import request from 'superagent';
import {login, logout} from '../actions/index_actions';
import { connect } from 'react-redux';

import Login from './login';


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            headerType: this.props.type,
            dialogContent: '',
            phoneNumberTips: '',
            passwordTips: ''
        };

    }
    componentWillUnmount(){

    }
    componentDidMount(){

    }
    renderLogin(){
        var {currentUser} = this.props;
        return (
            <div className="header-top">
                <div className="s-logo" onClick={this.goHome.bind(this)}></div>
                <ul className="right-side">
                    <li><a href="/home">{ currentUser.phone_number}</a></li>
                    <li><a href="javascript:;" onClick={this.logout.bind(this)}>退出</a></li>
                </ul>
            </div>
        );
    }
    renderUserHome(){
        var {currentUser} = this.props;
        return (
            <div className="header-top">
                <div className="s-logo" onClick={this.goHome.bind(this)}></div>
                <div className="system-type">
                    <span>参展商管理系统</span>
                    <span className="ml-10">|</span>
                    <span className="ml-10">欢迎</span>
                </div>
                <ul className="right-side">
                    <li><a href="">{ currentUser.phone_number}</a></li>
                    <li><a href="javascript:;" onClick={this.logout.bind(this)}>退出</a></li>
                </ul>
            </div>
        );
    }
    renderCompanyHome(){
        var {currentUser} = this.props;
        return (
            <div className="header-top">
                <div className="s-logo" onClick={this.goHome.bind(this)}></div>
                <div className="system-type">
                    <span>服务商管理系统</span>
                    <span className="ml-10">|</span>
                    <span className="ml-10">欢迎</span>
                </div>
                <ul className="right-side">
                    <li><a href="">{ currentUser.phone_number}</a></li>
                    <li><a href="javascript:;" onClick={this.logout.bind(this)}>退出</a></li>
                </ul>
            </div>
        );
    }
    renderUserRegister(){
        return (
            <div className="header-top">
                <div className="s-logo" onClick={this.goHome.bind(this)}></div>
                <div className="system-info">
                    <span className="system-name">参展商管理系统</span>
                    <span className="tips">
                        已有参展商账号？
                    </span>
                    <Login loginText="立即登录" registerUrl={this.props.registerUrl}></Login>
                </div>
            </div>
        );
    }
    logout(e){
        e.preventDefault();
        const { dispatch } = this.props;
        dispatch(logout());
        this.goHome();
    }
    goHome(){
        location.href = '/';
    }

    renderCompanyRegister(){
        return (
            <div className="header-top">
                <div className="s-logo" onClick={this.goHome.bind(this)}></div>
                <div className="system-info">
                    <span className="system-name">服务商管理系统</span>
                    <span className="tips">
                        已有服务商账号？
                    </span>
                    <Login loginText="立即登录" registerUrl={this.props.registerUrl}></Login>
                </div>
            </div>
        );
    }

    render() {
        var {currentUser, dispatch, type} = this.props;
        if(currentUser && type == 'user') return this.renderUserHome();
        if(currentUser && type == 'company') return this.renderCompanyHome();
        if(type == 'user-register') return this.renderUserRegister();
        if(type == 'company-register') return this.renderCompanyRegister();
        if(currentUser) return this.renderLogin();
        return (
            <div className="header-top">
                <div className="s-logo" onClick={this.goHome.bind(this)} ></div>
                <ul className="right-side">
                    <li><a href="/company/register"><button className="apply-btn">成为服务商</button></a></li>
                    <li><a href="/user/register">注册</a></li>
                    <li>
                        <Login registerUrl={this.props.registerUrl}></Login>
                    </li>
                </ul>

            </div>
        );
    }
}

//export default Header;

function headerState(state) {
    return {
        currentUser: state.authService.currentUser,
        dialogOpen: state.authService.dialogOpen
    }
}

export default connect(headerState)(Header);
