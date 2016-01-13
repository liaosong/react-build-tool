import React,{PropTypes} from 'react';
import { connect } from 'react-redux';
import { Router, Route, Link } from 'react-router';
import Header from '../components/header';

import Footer from '../components/footer';

import CompanyRegister from '../components/company_register';
import UserRegister from '../components/user_register';
import Select from 'react-select';
import {userRegister} from '../actions/index_actions';




class Register extends React.Component {
    constructor(props){
        super(props);
    }
    onRegister(user){
        let {dispatch} = this.props;
        dispatch(userRegister({
            user
        }));

    }
    componentWillReceiveProps(nextProps){
        var {currentUser} = nextProps;
        if(currentUser){
            location.href = '/home';
        }
    }

    render() {
        return (
            <div className="container">
                <Header type="user-register" registerUrl="/user/register"></Header>
                <div className="user-register">
                    <div className="register-about">
                        <div className="title">注册成为神州会展用户，可以发布您的需求，让更多服务商为您的需求提供方案和报价</div>
                        <a className="for-company-register" href="/company/register">想成为服务商？注册服务商账号</a>
                    </div>
                    <UserRegister onRegister={this.onRegister.bind(this)}></UserRegister>

                </div>
                <Footer></Footer>

            </div>
        );
    }


}

function registerState(state) {
    return {
        headerType: state.headerType,
        currentUser: state.authService.currentUser
    }
}

export default connect(registerState)(Register);