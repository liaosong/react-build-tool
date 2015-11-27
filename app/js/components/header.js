import React from 'react';
import classNames from 'classnames';
import Modal from 'react-modal';
import $ from 'jquery';
import request from 'superagent';
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: window.CURRENT_USER ? true: false,
            dialogStyle: {},
            dialogIsOpen: false,
            dialogContent: '',
            phoneNumberTips: '',
            passwordTips: '',
            currentUser: window.CURRENT_USER

        };
    }
    componentWillUnmount(){

    }
    componentDidMount(){
        //var url = '/api/client/is_login';
        //var t = new Date().getTime();
        //url = url + '?t=' + t;
        //$.get(url).then((res) => {
        //    if(res.status == 0 && res.data.user){
        //        //islogin
        //        this.setState({
        //            isLogin: true
        //        });
        //    }
        //}, (err) => {
        //    if(err.status == 401){
        //        this.setState({isLogin: false});
        //    }
        //
        //});
    }
    renderLogin(){
        return (
            <div className="header-top">
                <div className="s-logo"></div>
                <ul className="right-side">
                    <li><a href="">{ this.state.currentUser.phone_number}</a></li>
                    <li><a href="javascript:;" onClick={this.logout.bind(this)}>退出</a></li>
                </ul>
            </div>
        );
    }
    logout(){
        request.get('/api/users/logout').end((err, res) => {
            if(err) return console.log(err);
            if(res.body.status == 0){
                this.setState({
                    isLogin: false,
                    currentUser: undefined
                });
            }
        });
    }
    registerCompany(){
        this.setState({
            dialogIsOpen: true,
            dialogStyle: {
                content:{

                }
            }
        });
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
        if(this.checkPassword(password) && this.checkPhoneNumber(phoneNumber)){
            $.post('/api/client/web_login', {
                phone_number: phoneNumber,
                password: password
            }).then((res) => {
                if(res.status == 0){
                    this.setState({
                        isLogin: true,
                        currentUser: res.data.user,
                        dialogIsOpen: false
                    });

                }
            });
        }
        return false;
    }
    loginDialog(){
        this.setState({
            dialogIsOpen: true,
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
        });
    }

    render() {
        if(this.state.isLogin) return this.renderLogin();
        return (
            <div className="header-top">
                <div className="s-logo"></div>
                <ul className="right-side">
                    <li><a href=""><button className="apply-btn">成为服务商</button></a></li>
                    <li><a href="">注册</a></li>
                    <li><a href="javascript:;" onClick={this.loginDialog.bind(this)}>登陆</a></li>
                </ul>
                <Modal isOpen={this.state.dialogIsOpen} style={this.state.dialogStyle}>
                    <div className="login-container">
                        <div className="logo"></div>
                        <form method="POST" onSubmit={this.login.bind(this)} noValidate>
                            <input ref="phoneNumber" type="text" className="phone-number" onChange={this.checkPhoneNumber.bind(this)}/>
                            <div className="tips">{this.state.phoneNumberTips}</div>
                            <input ref="password" type="password" className="password" onChange={this.checkPassword.bind(this)}/>
                            <div className="tips">{this.state.passwordTips}</div>
                            <a href="" className="reset-password">忘记密码？</a>

                            <button type="submit">登陆</button>
                        </form>
                        <hr/>
                        <div className="reg-ref">
                            <span>还没有账号？</span>
                            <a href="">注册</a>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default Header;
