import React,{PropTypes} from 'react';
import { connect } from 'react-redux';
import request from 'superagent';
import classNames from 'classnames';
import Select from 'react-select';



import {checkPhoneNumber, checkPassword, isPasswordsEqual, checkCode} from '../utils/validate';

import CodeButton from './code_button';


class Wizard extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        var {step} = this.props;
        return (
            <div className="wizard-container">
                <ul className="apply-wizard cleanfix">
                    <li className={classNames('step', {'active': step == 1})}>
                        <div className={classNames('step-number', {'complete': step > 1})}>{step > 1 ? '': 1}</div>
                        <div className="step-name">申请注册</div>
                    </li>
                    <li className="line"></li>
                    <li className={classNames('step', {'active': step == 2})}>
                        <div className={classNames('step-number', {'complete': step > 2})}>{step > 2 ? '': 2}</div>
                        <div className="step-name">填写资料</div>
                    </li>
                    <li className="line"></li>
                    <li className={classNames('step', {'active': step == 3})}>
                        <div className={classNames('step-number', {'complete': step > 3})}>{step > 3 ? '': 3}</div>
                        <div className="step-name">审核</div>
                    </li>
                </ul>
            </div>
        )
    }
}

class Step1 extends React.Component{
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
                    phoneNumberTips: '该手机号已经注册为服务商，您可以直接登录'
                });
            }else if(userType == 'exhibitor'){
                this.setState({
                    phoneNumberTips: '该手机号已经注册为参展商，请更换手机号码后再注册'
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

    companyApply(e){
        e.preventDefault();
        let {onApply} = this.props;
        if(this.phoneNumberCheck() && this.codeCheck() && this.passwordCheck() && this.passwordRefCheck()){
            if(!this.state.captchaCorrect){
                this.setState({
                    captchaTips: '请输入正确的验证码'
                });
                return false;
            }

            onApply({
                phone_number: this.refs.phoneNumber.value,
                password: this.refs.password.value,
                code: this.refs.code.value,
                captcha: this.refs.captcha.value
            });

        }
    }

    onGetCode(){
        let phoneNumber = this.refs.phoneNumber.value;
        let res = this.phoneNumberCheck();
        let captcha = this.refs.captcha.value;

        if(res && this.state.captchaCorrect) return {phone_number: phoneNumber, captcha: captcha};

        return false;
    }

    render(){
        return (
            <div className="user-register-container w-1000 s-center step-1">
                <form onSubmit={this.companyApply.bind(this)}>
                    <div className="form-group">
                        <label htmlFor="phone_number">手机号</label>
                        <input type="text" className="row-input" ref="phoneNumber" onBlur={this.phoneNumberCheck.bind(this)}/>
                        <span className="err-tips">{this.state.phoneNumberTips}</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone_number">图形验证码</label>
                        <input type="text" className="part-row-input" ref="captcha" onBlur={this.checkCaptcha.bind(this)}/>
                        <img src={this.state.captchaUrl} alt="" className="inline captcha" onClick={this.changeCaptcha.bind(this)}/>
                        <span className="err-tips">{this.state.captchaTips}</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone_number">手机验证码</label>
                        <input type="text" className="part-row-input" ref="code" onBlur={this.codeCheck.bind(this)}/>
                        <CodeButton onGetCode={this.onGetCode.bind(this)}></CodeButton>
                        <span className="err-tips">{this.state.codeTips}</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone_number">设置密码</label>
                        <input type="password" className="row-input" ref="password" onBlur={this.passwordCheck.bind(this)}/>
                        <span className="err-tips">{this.state.passwordTips}</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone_number">重新输入密码</label>
                        <input type="password" className="row-input" ref="passwordRef" onBlur={this.passwordRefCheck.bind(this)}/>
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

class Step2 extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            companyNameTips: '',
            cityTips: '',
            addressTips: '',
            typeTips: '',
            contactsTips: '',
            city: '成都',
            type: 'full'
        };
    }
    companyInfo(e){
        e.preventDefault();
        var {onFillCompanyInfo, company} = this.props;
        if(this.checkForm()){
            var companyInfo = {
                name: this.refs.companyName.value,
                city: this.state.city,
                address: this.refs.address.value,
                type: this.state.type,
                contacts: this.refs.contacts.value,
                phone_number: this.refs.tel.value,
                email: this.refs.email.value
            }
            onFillCompanyInfo(company._id, companyInfo);

        }else{
            return false;
        }

    }

    requireCheck(value){
        return value ? true : false;
    }
    checkName(){
        var name = this.refs.companyName.value;
        if(this.requireCheck(name)){
            this.setState({
                companyNameTips: ''
            });
            return true;
        }else{
            this.setState({
                companyNameTips: '公司名称必填'
            });
        }
        return false;
    }

    checkType(){
        if(this.state.type){
            this.setState({
                typeTips: ''
            });
            return true;

        }else{
            this.setState({
                typeTips: '请选择公司服务类型'
            });
        }
        return false;
    }


    onCitySelect(newCity){
        this.setState({
            city: newCity
        });
    }
    checkAddress(){
        var name = this.refs.address.value;
        if(this.requireCheck(name)){
            this.setState({
                addressTips: ''
            });
            return true;
        }else{
            this.setState({
                addressTips: '详细地址必填'
            });
            return false;
        }
    }
    onTypeSelect(newType){
        this.setState({
            type: newType
        });
    }

    checkContacts(){
        var name = this.refs.contacts.value;
        if(this.requireCheck(name)){
            this.setState({
                contactsTips: ''
            });
            return true;
        }else{
            this.setState({
                contactsTips: '联系人必填'
            });
        }
        return false;
    }

    checkForm(){
        if(this.checkName() && this.checkAddress() && this.checkType()
            && this.checkContacts()
        ){
            return true;
        }
        return false;
    }

    render(){
        var cities = [
            { value: '北京', label: '北京' },
            { value: '上海', label: '上海' },
            { value: '广州', label: '广州' },
            { value: '深圳', label: '深圳' },
            { value: '天津', label: '天津' },
            { value: '杭州', label: '杭州' },
            { value: '南京', label: '南京' },
            { value: '武汉', label: '武汉' },
            { value: '重庆', label: '重庆' },
            { value: '成都', label: '成都' },
            { value: '西安', label: '西安' }
        ];
        //full:一站式服务公司 junior:专业性服务公司
        var serviceTypes = [
            { value: 'full', label: '一站式服务公司' },
            { value: 'junior', label: '专业性服务公司' }
        ];
        return (
            <div className="user-register-container w-1000 s-center step-2">
                <form onSubmit={this.companyInfo.bind(this)}>
                    <div className="form-group">
                        <label htmlFor="company-name">公司名称<span className="required">*</span></label>
                        <input type="text" className="row-input" ref="companyName" onBlur={this.checkName.bind(this)}/>
                        <span className="err-tips">{this.state.companyNameTips}</span>
                    </div>
                    <div className="from-group-container">
                        <div className="form-group inline form-group-height">
                            <label htmlFor="city">所在城市<span  className="required">*</span></label>
                            <Select options={cities} ref="city" value={this.state.city} className="part-row-input" placeholder="请选择" onChange={this.onCitySelect.bind(this)}></Select>
                            <span className="err-tips">{this.state.cityTips}</span>
                        </div>

                        <div className="form-group inline">
                            <label htmlFor="address">详细地址<span  className="required">*</span></label>
                            <input type="text" className="row-input" ref="address" onBlur={this.checkAddress.bind(this)}/>
                            <span className="err-tips">{this.state.addressTips}</span>
                        </div>
                    </div>
                    <div className="form-group form-group-height">
                        <label htmlFor="type">服务类型<span  className="required">*</span></label>
                        <Select options={serviceTypes} ref="type" value={this.state.type} className="row-input inline-b" placeholder="请选择" onChange={this.onTypeSelect.bind(this)}></Select>
                        <span className="err-tips">{this.state.typeTips}</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="contacts">联系人<span  className="required">*</span></label>
                        <input type="text" className="row-input" ref="contacts" onBlur={this.checkContacts.bind(this)}/>
                        <span className="err-tips">{this.state.contactsTips}</span>
                    </div>
                    <div className="from-group-container">
                        <div className="form-group inline row-group mr-20">
                            <label htmlFor="tel">固定电话</label>
                            <input type="text" className="row-input" ref="tel"/>
                            <span className="err-tips">{this.state.telTips}</span>
                        </div>
                        <div className="form-group inline row-group">
                            <label htmlFor="email">邮箱</label>
                            <input type="text" className="row-input" ref="email"/>
                            <span className="err-tips">{this.state.emailTips}</span>
                        </div>
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

class Step3 extends React.Component{

    render(){
        return (
            <div className="user-register-container w-1000 s-center step-3">
                <p className="check-tips">感谢您申请成为神州会展商家，我们将尽快审核您的账号，到时将有业务员与您联系！</p>
            </div>
        );
    }
}

class CompanyRegister extends React.Component{
    constructor(props){
        super(props);

    }

    componentWillReceiveProps(nextProps){
        var {currentUser} = nextProps;
        if(currentUser){
            location.href = '/home';
        }
    }

    onApply(user){
        var {onRegister} = this.props;
        onRegister(user);
    }

    onFillCompanyInfo(id, company){
        var {onFillCompany} = this.props;
        onFillCompany(id, company);
    }

    render(){
        var stepView, step;

        var {company, userType, error, message} = this.props;

        if(company && (company.status == 'unfinished')){
            stepView = <Step2 onFillCompanyInfo={this.onFillCompanyInfo.bind(this)} company={company}></Step2>;
            step = 2;
        }else if(company && (company.status == 'check')){
            stepView = <Step3></Step3>;
            step = 3;
        }else{
            stepView = <Step1 onApply={this.onApply.bind(this)} company={company} userType={userType} error={error} message={message}></Step1>;
            step = 1;
        }

        return (
            <div className="company-register">
                <div className="white-bg">
                    <Wizard step={step}></Wizard>
                </div>

                <div className="company-register">
                    {stepView}
                </div>


            </div>
        );
    }
}

//export default CompanyRegister;

function registerState(state) {
    return {
        company: state.companyRegister.company,
        currentUser: state.authService.currentUser,
        userType: state.companyRegister.userType,
        error: state.companyRegister.error,
        message: state.companyRegister.message
    }
}

export default connect(registerState)(CompanyRegister);
