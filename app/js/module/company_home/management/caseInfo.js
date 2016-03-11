import React, {Component} from 'react';
import Modal from 'react-modal';
import {Datepicker} from "../../../components/datepicker";
import {service_types} from '../../../global_data';
import CheckBoxGroup from '../../../components/checkbox_group';
import Upload from '../../../components/upload';

export class CaseInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isOpen: false,
            titleTips: '',
            dateTips: '',
            joinNumTips: '',
            imgUrlTips: '',
        }
    }

    componentDidMount(){
        this.toggleClass2body(false);

    }
    componentWillReceiveProps(nextProps){
        let {dialogOptions} = nextProps;
        this.setState({
            isOpen: dialogOptions.isOpen,
            case: dialogOptions.case
        });
        this.toggleClass2body(dialogOptions.isOpen);
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
    onRequestClose(){
        this.setState({
            isOpen: false
        });
    }


    saveCase(e){
        e.preventDefault();
        var {title, beginDate, endDate, joinedNum, address, serviceType, description, imgUrls} = this.refs;
        imgUrls = imgUrls.value.map((item) => {
            return {url: item}
        })
        var caseInfo = {
            title: title.value,
            begin_date: beginDate.value,
            end_date: endDate.value,
            joined_num: joinedNum.value,
            address: address.value,
            service_type: serviceType.value,
            _description: description.value,
            img_urls: imgUrls
        };

        let {onSave} = this.props;
        if(this.checkTitle() && this.checkDate() && this.checkJoinedNum() && this.checkImgUrls()){
            if(this.state.case && this.state.case._id){
                onSave(this.state.case._id, caseInfo);
            }else{
                onSave(null, caseInfo);
            }
        }


    }

    checkTitle(){
        var {title} = this.refs;
        if(title.value){
            this.setState({
                titleTips: ''
            });
            return true;
        }else{
            this.setState({
                titleTips: '标题必填'
            });
            return false;
        }
    }
    checkDate(){
        var {beginDate, endDate} = this.refs;

        if(beginDate.value){
            if(endDate.value){
                if(beginDate.value <= endDate.value){
                    this.setState({
                        dateTips: ''
                    });
                }else{
                    this.setState({
                        dateTips: '结束日期不能在开始日期之前'
                    });
                    return false;
                }
            }
        }
        return true;

    }

    checkJoinedNum(){
        var {joinedNum} = this.refs;
        if(!joinedNum.value) return true;
        if(/[1-9]\d*/.test(joinedNum.value)){
            this.setState({
                joinNumTips: ''
            });
            return true;
        }else{
            if(joinedNum.value){
                this.setState({
                    joinNumTips: '参加人数必须为数字，且不能为0'
                });
                return false;
            }else{
                return true;
            }
        }
    }

    checkImgUrls(){
        var {imgUrls} = this.refs;
        if(imgUrls.value && imgUrls.value.length >=1){
            this.setState({
                imgUrlTips: ''
            });
            return true;
        }else{
            this.setState({
                imgUrlTips: '案例图片不能为空'
            });
            return false;
        }
    }



    render(){
        let {dialogOptions, onDialogClose} = this.props;
        let dialogStyle = {
            content:{
                top: "60px",
                left: "100px",
                right: "100px",
                border: 'none',
                padding: 0,
                bottom: "initial",
                marginBottom: '60px',
                borderRadius: 'none',
                boxShadow: '0px 1px 5px rgba(0,0,0,.3)'
            },
            overlay:{
                backgroundColor: 'rgba(246, 246, 246, 0.9)',
                overflowY: 'scroll',
                width: '100%',
                height: '100%',
            }
        }

        let caseObj = dialogOptions.case || {};


        return (
            <Modal isOpen={this.state.isOpen} style={dialogStyle} onRequestClose={this.onRequestClose.bind(this)}>
                <div className="w-1000 s-center">
                    <form className="x-form j8-form" onSubmit={this.saveCase.bind(this)}>
                        <div className="form-row-group">
                            <label className="j8-label">
                                <span>标题</span>
                                <span className="required">*</span>
                            </label>
                            <input type="text" className="form-row-control j8-input full-w" ref="title" defaultValue={caseObj.title}/>
                            <span className="error-tips">{this.state.titleTips}</span>
                        </div>

                        <div className="form-row-group">
                            <label className="j8-label">
                                <span>举办日期</span>
                            </label>
                            <Datepicker className="half-w inline-b" ref="beginDate" defaultValue={caseObj.begin_date}></Datepicker>
                            <label className="concat-label">至</label>
                            <Datepicker className="half-w inline-b" ref="endDate" defaultValue={caseObj.end_date}></Datepicker>
                            <span className="error-tips">{this.state.dateTips}</span>
                        </div>
                        <div className="form-row-group">
                            <label className="j8-label">
                                <span>参加人数</span>
                            </label>
                            <input type="text" className="form-row-control j8-input half-w" ref="joinedNum" defaultValue={caseObj.joined_num}/>
                            <span className="error-tips">{this.state.joinNumTips}</span>
                        </div>
                        <div className="form-row-group">
                            <label className="j8-label">举办地点</label>
                            <input type="text" className="form-row-control j8-input full-w" ref="address" defaultValue={caseObj.address}/>
                        </div>
                        <div className="form-row-group service-type">
                            <label className="j8-label">提供服务</label>
                            <CheckBoxGroup group={service_types} value={caseObj.service_type || []} className="inline-b w-800" ref="serviceType"></CheckBoxGroup>
                        </div>
                        <div className="form-row-group">
                            <label className="j8-label inline">活动详情</label>
                            <textarea className="form-row-control description" ref="description" defaultValue={caseObj._description}></textarea>
                        </div>
                        <div className="form-row-group">
                            <label className="j8-label">
                                <span>案例图片</span>
                                <span className="required">*</span>
                            </label>
                            <p className="inline case-img-tip">添加案例图片，让用户更加了解您的实力！只支持JPG、PNG、GIF，文件大小不超过5M</p>
                            <Upload multiple className="inline ml-120" ref="imgUrls" value={caseObj.img_urls}></Upload>
                            <div className="error-tips ml-120">{this.state.imgUrlTips}</div>
                        </div>
                        <hr className="line"/>
                        <div className="x-btn-group">
                            <button className="x-save-btn" type="submit">保存</button>
                            <button className="x-cancel-btn ml-20" type="button" onClick={this.onRequestClose.bind(this)}>取消</button>
                        </div>

                    </form>
                </div>
            </Modal>
        );
    }
}
