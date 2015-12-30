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
            captchaUrl: '/api/captcha.jpg'
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
            code: code.value
        }

        onTenderSave(tender);


    }

    render(){

        return (
            <form className="tender-form" onSubmit={this.onTenderCreate.bind(this)}>
                <div className="tender-info">
                    <div className="w-1000 s-center">
                        <div className="form-group">
                            <label className="control-label">会议时间 <span className="required-tag">*</span></label>
                            <div className="control-group">
                                <Datepicker placeholder="开始时间" className="control-input control-w inline-b input-w" ref="beginDate"></Datepicker>
                                <label className="concat-label">至</label>
                                <Datepicker placeholder="结束时间" className="control-input control-w inline-b input-w" ref="endDate"></Datepicker>
                            </div>

                            <div className="form-group">
                                <label className="control-label">会议城市 <span className="required-tag">*</span></label>
                                <div className="control-group">
                                    <CitySelecter className="cust-city-select" ref="address"></CitySelecter>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="control-label">参加人数 <span className="required-tag">*</span></label>
                                <div className="control-group">
                                    <input type="text" className="control-input control-w" placeholder="请输入最少人数" ref="minNum"/>
                                    <label className="concat-label">至</label>
                                    <input type="text" className="control-input control-w" placeholder="请输入最多人数" ref="maxNum"/>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="control-label">预算 <span className="required-tag">*</span></label>
                                <div className="control-group">
                                    <input type="text" className="control-input control-w" placeholder="请输入您的预算" ref="budget"/>
                                    <label className="unit">元</label>
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
                        <div className="form-group inline-b">
                            <label className="control-label">联系人 <span className="required-tag">*</span></label>
                            <div className="control-group">
                                <input type="text" className="control-input control-w" placeholder="请输入联系人" ref="contacts"/>
                            </div>
                        </div>
                        <div className="form-group inline-b ml-100">
                            <label className="control-label">联系方式 <span className="required-tag">*</span></label>
                            <div className="control-group">
                                <input type="text" className="control-input control-w" placeholder="请输入联系方式" ref="tel"/>
                            </div>
                        </div>
                        <div className="form-group inline-b ml-100 ">
                            <label className="control-label">验证码 <span className="required-tag">*</span></label>
                            <div className="control-group">
                                <input type="text" className="control-input captcha-w" placeholder="请输入验证码" ref="code"/>
                                <img src={this.state.captchaUrl} alt="" className="inline captcha ml-10" onClick={this.changeCaptcha.bind(this)}/>
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
            captchaUrl: '/api/captcha.jpg'
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

        onTenderSave(tender);


    }
    render(){
        return (
            <form className="tender-form" onSubmit={this.onTenderCreate.bind(this)}>
                <div className="tender-info">
                    <div className="w-1000 s-center">
                        <div className="form-group">
                            <label className="control-label">展览时间 <span className="required-tag">*</span></label>
                            <div className="control-group">
                                <Datepicker placeholder="开始时间" className="control-input control-w inline-b input-w" ref="beginDate"></Datepicker>
                                <label className="concat-label">至</label>
                                <Datepicker placeholder="结束时间" className="control-input control-w inline-b input-w" ref="endDate"></Datepicker>
                            </div>

                            <div className="form-group">
                                <label className="control-label">展览城市 <span className="required-tag">*</span></label>
                                <div className="control-group">
                                    <CitySelecter className="cust-city-select" ref="address"></CitySelecter>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="control-label">展位面积 <span className="required-tag">*</span></label>
                                <div className="control-group">
                                    <input type="text" className="control-input control-w" placeholder="请输入最少人数" ref="boothArea"/>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="control-label">预算 <span className="required-tag">*</span></label>
                                <div className="control-group">
                                    <input type="text" className="control-input control-w" placeholder="请输入您的预算" ref="budget"/>
                                    <label className="unit">元</label>
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
                        <div className="form-group inline-b">
                            <label className="control-label">联系人 <span className="required-tag">*</span></label>
                            <div className="control-group">
                                <input type="text" className="control-input control-w" placeholder="请输入联系人" ref="contacts"/>
                            </div>
                        </div>
                        <div className="form-group inline-b ml-100">
                            <label className="control-label">联系方式 <span className="required-tag">*</span></label>
                            <div className="control-group">
                                <input type="text" className="control-input control-w" placeholder="请输入联系方式" ref="tel"/>
                            </div>
                        </div>
                        <div className="form-group inline-b ml-100 ">
                            <label className="control-label">验证码 <span className="required-tag">*</span></label>
                            <div className="control-group">
                                <input type="text" className="control-input captcha-w" placeholder="请输入验证码" ref="code"/>
                                <img src={this.state.captchaUrl} alt="" className="inline captcha ml-10" onClick={this.changeCaptcha.bind(this)}/>
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
        var {initData} = this.props;
        var tenderContent = "";
        if(initData.tenderType == 'meeting'){
            tenderContent = (<Meeting onTenderSave={this.onCreate.bind(this)}></Meeting>);
        }else{
            tenderContent = (<Exhibition onTenderSave={this.onCreate.bind(this)}></Exhibition>);
        }
        return (
            <div className="container">
                <Header type="user"></Header>
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

function headerState({authService}) {
    return {
        currentUser: authService.currentUser
    };
}

export default connect(headerState)(Tender);