

import React,{PropTypes} from 'react';
import { connect } from 'react-redux';
import { Router, Route, Link } from 'react-router';
import Header from '../components/header';

import Footer from '../components/footer';

import CompanyRegister from '../components/company_register';
import Select from 'react-select';
import {companyRegister, fillCompanyInfo} from '../actions/index_actions';




class Register extends React.Component {
    constructor(props){
        super(props);
    }
    //componentDidMount(){
    //    var {initData, dispatch} = this.props;
    //    if(initData.currentUser) {
    //        dispatch({
    //            type: 'INIT_AUTH',
    //            currentUser: initData.currentUser
    //        });
    //
    //        dispatch({
    //            type: 'COMPANY_REGISTER',
    //            company: initData.company
    //        });
    //    }
    //
    //}

    onCompanyRegister(user){
        let {dispatch} = this.props;
        dispatch(companyRegister(user));
    }

    onFillCompany(id, company){
        let {dispatch} = this.props;
        dispatch(fillCompanyInfo(id, company));
    }

    render() {
        return (
            <div className="container">
                <Header type="company-register" registerUrl="/company/register"></Header>
                <CompanyRegister onRegister={this.onCompanyRegister.bind(this)} onFillCompany={this.onFillCompany.bind(this)}></CompanyRegister>
                <Footer></Footer>

            </div>
        );
    }


}

function registerState(state) {
    return {
        currentUser: state.authService.currentUser,
        company: state.companyRegister.company,
        userType: state.companyRegister.userType
    }
}

export default connect(registerState)(Register);