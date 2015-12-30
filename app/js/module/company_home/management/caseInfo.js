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
            isOpen: false
        }
    }

    componentDidMount(){

    }
    componentWillReceiveProps(nextProps){
        let {dialogOptions} = nextProps;
        this.setState({
            isOpen: dialogOptions.isOpen,
            case: dialogOptions.case
        });
    }
    onRequestClose(){
        this.setState({
            isOpen: false
        });
    }


    saveCase(e){
        e.preventDefault();
        var {title, beginDate, endDate, joinedNum, address, serviceType, description, imgUrls} = this.refs;
        var caseInfo = {
            title: title.value,
            begin_date: beginDate.value,
            end_date: endDate.value,
            joined_num: joinedNum.value,
            address: address.value,
            service_type: serviceType.value,
            _description: description.value,
            img_urls: imgUrls.value
        };

        let {onSave} = this.props;

        if(this.state.case && this.state.case._id){
            onSave(this.state.case._id, caseInfo);
        }else{
            onSave(null, caseInfo);
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
            },
            overlay:{
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }
        }

        let caseObj = dialogOptions.case || {};


        return (
            <Modal isOpen={this.state.isOpen} style={dialogStyle} onRequestClose={this.onRequestClose.bind(this)}>
                <div className="w-1000 s-center">
                    <form className="x-form j8-form" onSubmit={this.saveCase.bind(this)}>
                        <div className="form-row-group">
                            <label className="j8-label">标题</label>
                            <input type="text" className="form-row-control j8-input full-w" ref="title" defaultValue={caseObj.title}/>
                        </div>

                        <div className="form-row-group">
                            <label className="j8-label">举办日期</label>
                            <Datepicker className="half-w inline-b" ref="beginDate" defaultValue={caseObj.begin_date}></Datepicker>
                            <label className="concat-label">至</label>
                            <Datepicker className="half-w inline-b" ref="endDate" defaultValue={caseObj.end_date}></Datepicker>
                        </div>
                        <div className="form-row-group">
                            <label className="j8-label">参见人数</label>
                            <input type="text" className="form-row-control j8-input half-w" ref="joinedNum" defaultValue={caseObj.joined_num}/>
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
                            <label className="j8-label">案例图片</label>
                            <Upload multiple className="inline" ref="imgUrls" value={caseObj.img_urls}></Upload>
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
