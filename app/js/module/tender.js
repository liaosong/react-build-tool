import React from 'react';
import { connect } from 'react-redux';

import Header from '../components/header';
import Footer from '../components/footer';
import {Datepicker} from "../components/datepicker";

import {CitySelecter} from "../components/city_selecter";

import request from 'superagent';


function createTender(tender){
    return dispatch =>{
        request.post('/api/tenders').send(tender).end((err, res) => {
            if(err) return console.log(err);

            if(res.body.status == 0){
                dispatch({
                    type: 'TENDER_CREATE_SUCCESS',
                    tender: res.body.data
                });
            }else{
                console.log(res.body.message)
            }
        });
    }
}


class Meeting extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            captchaUrl: '/api/captcha.jpg',
            dateCheckStatus: {},
            addressStatus: {},
            joinNumStatus: {},
            budgetStatus: {},
            contactStatus: {},
            telStatus: {},
            captchaStatus: {
                res: false
            }
        };
    }

    changeCaptcha(){
        this.setState({
            captchaUrl: '/api/captcha.jpg?t=' + new Date().getTime()
        });
    }

    onTenderCreate(e){
        e.preventDefault();
        var {onTenderSave} = this.props;
        var {beginDate, endDate, address, minNum, maxNum,budget,others, contacts, tel, code} = this.refs;
        if(this.checkDate() && this.checkCity() && this.checkJoinNum()
            && this.checkBudget() && this.checkContacts() && this.checkTel() && this.checkCode()){


            var tender = {
                begin_date: beginDate.value,
                end_date: endDate.value,
                address: address.value,
                min_join_num: minNum.value,
                max_join_num: maxNum.value,
                budget: budget.value,
                others: others.value,
                contacts: contacts.value,
                tel: tel.value,
                code: code.value,
            }
            tender.category = '会议';

            onTenderSave(tender);
        }


    }

    checkDate(oldVal, newVal){
        var {beginDate, endDate} = this.refs;
        var beginDateVal = beginDate.value;
        var endDateVal = endDate.value;
        if(beginDateVal){
            if(endDateVal){
                this.setState({
                    dateCheckStatus: {
                        res: true,
                        message: ''
                    }
                });
                return true;
            }else{
                this.setState({
                    dateCheckStatus: {
                        res: false,
                        message: '结束日期必填'
                    }
                });
                return false;
            }
        }else{
            this.setState({
                dateCheckStatus: {
                    res: false,
                    message: '开始日期必填'
                }
            });
            return false;
        }

    }

    onCityChange(old, newCity){
        if(newCity && (newCity !== '不限')){
            this.setState({
                addressStatus: {
                    res: true,
                    message: ''
                }
            });
            return true;
        }else{
            this.setState({
                addressStatus: {
                    res: false,
                    message: '举办地点必选'
                }
            });
            return false;

        }
    }

    checkCity(){
        var city = this.refs.address.value;
        if(city && (city !== '不限')){
            this.setState({
                addressStatus: {
                    res: true,
                    message: ''
                }
            });
            return true;
        }else{
            this.setState({
                addressStatus: {
                    res: false,
                    message: '举办地点必选'
                }
            });
            return false;

        }


    }

    checkJoinNum(){
        var {minNum, maxNum} = this.refs;
        var minVal = minNum.value;
        var maxVal = maxNum.value;

        if(minVal){
            if(maxVal){
                if(maxVal > minVal){
                    this.setState({
                        joinNumStatus: {
                            res: true,
                            message: ''
                        }
                    });
                    return true;
                }else{
                    this.setState({
                        joinNumStatus: {
                            res: false,
                            message: '与会最大人数不能小于最小人数'
                        }
                    });
                    return false;
                }
            }else{
                this.setState({
                    joinNumStatus: {
                        res: false,
                        message: '请添加与会的最大人数'
                    }
                });
                return false;
            }
        }else{
            this.setState({
                joinNumStatus: {
                    res: false,
                    message: '请填写与会的最少人数'
                }
            });
            return false;

        }

    }

    checkBudget(){
        var {budget} = this.refs;
        if(budget.value){
            this.setState({
                budgetStatus: {
                    res: true,
                    message: ''
                }
            });
            return true;
        }else{
            this.setState({
                budgetStatus: {
                    res: false,
                    message: '预算必填'
                }
            });
            return false;
        }


    }

    checkContacts(){
        var {contacts} = this.refs;
        if(contacts.value){
            this.setState({
                contactStatus: {
                    res: true,
                    message: ''
                }
            });
            return true;
        }else{
            this.setState({
                contactStatus: {
                    res: false,
                    message: '联系人必填'
                }
            });
            return false;
        }

    }
    checkTel(){
        var {tel} = this.refs;
        if(tel.value && (/1\d{10}/.test(tel.value) || /\d{3,5}-\d+/.test(tel.value))){
            this.setState({
                telStatus: {
                    res: true,
                    message: ''
                }
            });
            return true;
        }else{
            this.setState({
                telStatus: {
                    res: false,
                    message: '请填入正确的联系方式'
                }
            });
            return false;
        }

    }
    checkCode(){
        if(this.state.captchaStatus.res){
            return true;
        }else{
            if(!this.state.captchaStatus.message){
                this.setState({
                    captchaStatus: {
                        res: false,
                        message: '请填写验证码'
                    }
                });
            }
            return false;
        }
    }


    checkCaptcha(){
        var code = this.refs.code.value;
        if(!code){
            this.setState({
                captchaStatus: {
                    res: false,
                    message: '请输入验证码'
                }
            });
            return;
        }

        request.post('/api/captcha_check')
            .send({captcha: code})
            .end((err, res) => {
                if(err){
                    return console.log(err);
                }

                if(res.body.status == 0){
                    this.setState({
                        captchaStatus: {
                            res: true,
                            message: ''
                        }
                    });
                }else{
                    this.setState({
                        captchaStatus: {
                            res: false,
                            message: '验证码有误'
                        }
                    });
                }
            });

    }


    render(){

        return (
            <form className="tender-form" onSubmit={this.onTenderCreate.bind(this)}>
                <div className="tender-info">
                    <div className="w-1000 s-center">
                        <div className="form-group">
                            <label className="control-label">会议时间 <span className="required-tag">*</span></label>
                            <div className="control-group">
                                <Datepicker placeholder="开始时间" className="control-input control-w inline-b input-w" ref="beginDate" onDataChange={this.checkDate.bind(this)}></Datepicker>
                                <label className="concat-label">至</label>
                                <Datepicker placeholder="结束时间" className="control-input control-w inline-b input-w" ref="endDate" onDataChange={this.checkDate.bind(this)}></Datepicker>
                                <span className="error-tips">{this.state.dateCheckStatus.message}</span>
                            </div>

                            <div className="form-group">
                                <label className="control-label">会议城市 <span className="required-tag">*</span></label>
                                <div className="control-group">
                                    <CitySelecter className="cust-city-select" ref="address" onSelectChange={this.onCityChange.bind(this)}></CitySelecter>
                                    <span className="error-tips">{this.state.addressStatus.message}</span>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="control-label">参加人数 <span className="required-tag">*</span></label>
                                <div className="control-group">
                                    <input className="control-input control-w" placeholder="请输入最少人数" ref="minNum" type="number" onBlur={this.checkJoinNum.bind(this)}/>
                                    <label className="concat-label">至</label>
                                    <input className="control-input control-w" placeholder="请输入最多人数" ref="maxNum" type="number" onBlur={this.checkJoinNum.bind(this)}/>
                                    <span className="error-tips">{this.state.joinNumStatus.message}</span>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="control-label">预算 <span className="required-tag">*</span></label>
                                <div className="control-group">
                                    <input className="control-input control-w" placeholder="请输入您的预算" ref="budget" type="number" onBlur={this.checkBudget.bind(this)}/>
                                    <label className="unit">元</label>
                                    <span className="error-tips">{this.state.budgetStatus.message}</span>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="control-label">详细需求</label>
                                <div className="control-group">
                                    <textarea placeholder="请输入您的详细需求" className="w-1000 control-text" ref="others"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="concats-info">
                    <div className="w-1000 s-center">
                        <div className="form-group inline">
                            <label className="control-label">联系人 <span className="required-tag">*</span></label>
                            <div className="control-group">
                                <input type="text" className="control-input control-w" placeholder="请输入联系人" ref="contacts" onBlur={this.checkContacts.bind(this)}/>
                                <div className="error-tips">{this.state.contactStatus.message}</div>
                            </div>
                        </div>
                        <div className="form-group inline ml-100">
                            <label className="control-label">联系方式 <span className="required-tag">*</span></label>
                            <div className="control-group">
                                <input type="text" className="control-input control-w" placeholder="请输入联系方式" ref="tel" onBlur={this.checkTel.bind(this)}/>
                                <div className="error-tips">{this.state.telStatus.message}</div>
                            </div>
                        </div>
                        <div className="form-group inline ml-100 ">
                            <label className="control-label">验证码 <span className="required-tag">*</span></label>
                            <div className="control-group">
                                <input type="text" className="control-input captcha-w" placeholder="请输入验证码" ref="code" onBlur={this.checkCaptcha.bind(this)}/>
                                <img src={this.state.captchaUrl} alt="" className="inline captcha ml-10" onClick={this.changeCaptcha.bind(this)}/>
                                <div className="error-tips">{this.state.captchaStatus.message}</div>
                            </div>
                        </div>
                        <hr/>
                        <button className="g-btn-primary tender-btn" type="submit">发布需求</button>
                    </div>
                </div>

            </form>
        );
    }

}

class Exhibition extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            captchaUrl: '/api/captcha.jpg',
            dateCheckStatus: {},
            addressStatus: {},
            boothAreaStatus: {},
            budgetStatus: {},
            contactStatus: {},
            telStatus: {},
            captchaStatus: {
                res: false
            }


        };
    }

    changeCaptcha(){
        this.setState({
            captchaUrl: '/api/captcha.jpg?t=' + new Date().getTime()
        });
    }

    onTenderCreate(e){
        e.preventDefault();
        var {onTenderSave} = this.props;
        var {beginDate, endDate, address, boothArea,budget,others, contacts, tel, code} = this.refs;
        if(this.checkDate() && this.checkCity() && this.checkBoothArea()
            && this.checkBudget() && this.checkContacts() && this.checkTel() && this.checkCode()){

            var tender = {
                begin_date: beginDate.value,
                end_date: endDate.value,
                address: address.value,
                booth_area: boothArea.value,
                budget: budget.value,
                others: others.value,
                contacts: contacts.value,
                tel: tel.value,
                code: code.value
            }
            tender.category = '展览';

            onTenderSave(tender);
        }


    }

    checkDate(oldVal, newVal){
        var {beginDate, endDate} = this.refs;
        var beginDateVal = beginDate.value;
        var endDateVal = endDate.value;
        if(beginDateVal){
            if(endDateVal){
                this.setState({
                    dateCheckStatus: {
                        res: true,
                        message: ''
                    }
                });
                return true;
            }else{
                this.setState({
                    dateCheckStatus: {
                        res: false,
                        message: '结束日期必填'
                    }
                });
                return false;
            }
        }else{
            this.setState({
                dateCheckStatus: {
                    res: false,
                    message: '开始日期必填'
                }
            });
            return false;
        }

    }

    onCityChange(old, newCity){
        if(newCity && (newCity !== '不限')){
            this.setState({
                addressStatus: {
                    res: true,
                    message: ''
                }
            });
            return true;
        }else{
            this.setState({
                addressStatus: {
                    res: false,
                    message: '举办地点必选'
                }
            });
            return false;

        }
    }

    checkCity(){
        var city = this.refs.address.value;
        if(city && (city !== '不限')){
            this.setState({
                addressStatus: {
                    res: true,
                    message: ''
                }
            });
            return true;
        }else{
            this.setState({
                addressStatus: {
                    res: false,
                    message: '举办地点必选'
                }
            });
            return false;

        }


    }
    checkBudget(){
        var {budget} = this.refs;
        if(budget.value){
            this.setState({
                budgetStatus: {
                    res: true,
                    message: ''
                }
            });
            return true;
        }else{
            this.setState({
                budgetStatus: {
                    res: false,
                    message: '预算必填'
                }
            });
            return false;
        }


    }

    checkBoothArea(){
        var {boothArea} = this.refs;
        if(boothArea.value){
            this.setState({
                boothAreaStatus: {
                    res: true,
                    message: ''
                }
            });
            return true;
        }else{
            this.setState({
                boothAreaStatus: {
                    res: false,
                    message: '展位面积必填'
                }
            });
            return false;
        }
    }

    checkContacts(){
        var {contacts} = this.refs;
        if(contacts.value){
            this.setState({
                contactStatus: {
                    res: true,
                    message: ''
                }
            });
            return true;
        }else{
            this.setState({
                contactStatus: {
                    res: false,
                    message: '联系人必填'
                }
            });
            return false;
        }

    }
    checkTel(){
        var {tel} = this.refs;
        if(tel.value && (/1\d{10}/.test(tel.value) || /\d{3,5}-\d+/.test(tel.value))){
            this.setState({
                telStatus: {
                    res: true,
                    message: ''
                }
            });
            return true;
        }else{
            this.setState({
                telStatus: {
                    res: false,
                    message: '请填入正确的联系方式'
                }
            });
            return false;
        }

    }
    checkCode(){
        if(this.state.captchaStatus.res){
            return true;
        }else{
            if(!this.state.captchaStatus.message){
                this.setState({
                    captchaStatus: {
                        res: false,
                        message: '请填写验证码'
                    }
                });
            }
            return false;
        }
    }


    checkCaptcha(){
        var code = this.refs.code.value;
        if(!code){
            this.setState({
                captchaStatus: {
                    res: false,
                    message: '请输入验证码'
                }
            });
            return;
        }

        request.post('/api/captcha_check')
            .send({captcha: code})
            .end((err, res) => {
                if(err){
                    return console.log(err);
                }

                if(res.body.status == 0){
                    this.setState({
                        captchaStatus: {
                            res: true,
                            message: ''
                        }
                    });
                }else{
                    this.setState({
                        captchaStatus: {
                            res: false,
                            message: '验证码有误'
                        }
                    });
                }
            });

    }
    render(){
        return (
            <form className="tender-form" onSubmit={this.onTenderCreate.bind(this)}>
                <div className="tender-info">
                    <div className="w-1000 s-center">
                        <div className="form-group">
                            <label className="control-label">展览时间 <span className="required-tag">*</span></label>
                            <div className="control-group">
                                <Datepicker placeholder="开始时间" className="control-input control-w inline-b input-w" ref="beginDate" onDataChange={this.checkDate.bind(this)}></Datepicker>
                                <label className="concat-label">至</label>
                                <Datepicker placeholder="结束时间" className="control-input control-w inline-b input-w" ref="endDate" onDataChange={this.checkDate.bind(this)}></Datepicker>
                                <span className="error-tips">{this.state.dateCheckStatus.message}</span>
                            </div>

                            <div className="form-group">
                                <label className="control-label">展览城市 <span className="required-tag">*</span></label>
                                <div className="control-group">
                                    <CitySelecter className="cust-city-select" ref="address" onSelectChange={this.onCityChange.bind(this)}></CitySelecter>
                                    <span className="error-tips">{this.state.addressStatus.message}</span>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="control-label">展位面积 <span className="required-tag">*</span></label>
                                <div className="control-group">
                                    <input type="number" className="control-input control-w" placeholder="请输入展位面积" ref="boothArea" onBlur={this.checkBoothArea.bind(this)}/>
                                    <span className="error-tips">{this.state.boothAreaStatus.message}</span>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="control-label">预算 <span className="required-tag">*</span></label>
                                <div className="control-group">
                                    <input type="number" className="control-input control-w" placeholder="请输入您的预算" ref="budget" onBlur={this.checkBudget.bind(this)}/>
                                    <label className="unit">元</label>
                                    <span className="error-tips">{this.state.budgetStatus.message}</span>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="control-label">详细需求</label>
                                <div className="control-group">
                                    <textarea placeholder="请输入您的详细需求" className="w-1000 control-text" ref="others"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="concats-info">
                    <div className="w-1000 s-center">
                        <div className="form-group inline">
                            <label className="control-label">联系人 <span className="required-tag">*</span></label>
                            <div className="control-group">
                                <input type="text" className="control-input control-w" placeholder="请输入联系人" ref="contacts" onBlur={this.checkContacts.bind(this)}/>
                                <div className="error-tips">{this.state.contactStatus.message}</div>
                            </div>
                        </div>
                        <div className="form-group inline ml-100">
                            <label className="control-label">联系方式 <span className="required-tag">*</span></label>
                            <div className="control-group">
                                <input type="text" className="control-input control-w" placeholder="请输入联系方式" ref="tel" onBlur={this.checkTel.bind(this)}/>
                                <div className="error-tips">{this.state.telStatus.message}</div>
                            </div>
                        </div>
                        <div className="form-group inline ml-100 ">
                            <label className="control-label">验证码 <span className="required-tag">*</span></label>
                            <div className="control-group">
                                <input type="text" className="control-input captcha-w" placeholder="请输入验证码" ref="code" onBlur={this.checkCaptcha.bind(this)}/>
                                <img src={this.state.captchaUrl} alt="" className="inline captcha ml-10" onClick={this.changeCaptcha.bind(this)}/>
                                <div className="error-tips">{this.state.captchaStatus.message}</div>
                            </div>
                        </div>
                        <hr/>
                        <button className="g-btn-primary tender-btn" type="submit">发布需求</button>
                    </div>
                </div>

            </form>

        );
    }
}

class Tender extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            captchaUrl: '/api/captcha.jpg'
        };
    }

    changeCaptcha(){
        this.setState({
            captchaUrl: '/api/captcha.jpg?t=' + new Date().getTime()
        });
    }
    componentDidMount(){
        var {initData, dispatch} = this.props;
        dispatch({
            type: 'INIT_AUTH',
            currentUser: initData.currentUser
        });

    }

    onCreate(tender){
        var {currentUser, dispatch} = this.props;
        tender.publisher = currentUser._id;
        dispatch(createTender(tender));
    }
    render(){
        var {initData, tenderCreate} = this.props;
        var tenderContent = "";

        if(tenderCreate){
            tenderContent = (
                <div className="tender-create-success">
                    <p>需求发布成功，已提交审核，请耐心等待！</p>
                </div>
            );
        }else{

            if(initData.tenderType == 'meeting'){
                tenderContent = (<Meeting onTenderSave={this.onCreate.bind(this)}></Meeting>);
            }else{
                tenderContent = (<Exhibition onTenderSave={this.onCreate.bind(this)}></Exhibition>);
            }
        }

        return (
            <div className="container">
                <Header></Header>
                    <div className="tender-container">
                        <div className="head">
                            <div className="title">发布需求</div>
                            <p>神州会展绝不向您收取任何中介费用，请放心发布</p>
                        </div>
                        {tenderContent}
                    </div>
                <Footer></Footer>
            </div>
        );
    }

}

function headerState({authService, index}) {
    return {
        currentUser: authService.currentUser,
        tenderCreate: index.tenderCreate
    };
}

export default connect(headerState)(Tender);