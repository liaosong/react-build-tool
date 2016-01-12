
import React, {Component} from 'react';
import { connect, dispatch} from 'react-redux';
import {pushState} from 'redux-router';
import ReactDOM from 'react-dom';
import Upload from '../../../components/upload';
//import CheckBox from '../../../components/checkbox';
import CheckBoxGroup from '../../../components/checkbox_group';

import {updateCompany} from '../../../actions/company_actions';
import {service_types} from '../../../global_data';

function updateView(){
    return dispatch =>{
        dispatch({
            type: 'COMPANY_INFO_UPDATE_VIEW'
        });
    }
}

function showView(){
    return dispatch =>{
        dispatch({
            type: 'COMPANY_INFO_SHOW_VIEW'
        });
    }
}

class CompanyInfo extends Component{
    constructor(props){
        super(props);
    }

    onStatusChange(res){
        switch (res.status){
            case 'uploading':
                return console.log('uploading');
            case 'error':
                return console.log('error');
            case 'done':
                return console.log('done');
            default :
                console.log('err');

        }
    }

    onEdit(){
        let {updateView} = this.props;

        updateView();
    }
    onShow(){
        let {showView} = this.props;
        showView();
    }

    onDataSubmit(e){
        e.preventDefault();
        var {company, updateCompany} = this.props;

        let keywords = this.refs.keywords.value;
        keywords = keywords.replace(/ /, '').replace(/，/, ',').split(',');

        var companyInfo = {
            company_logo: this.refs.logo.value,
            company_img: this.refs.companyImg.value,
            keywords: keywords,
            services_type: this.refs.servicesType.value,
            _description: this.refs.description.value
        }

        updateCompany(company._id, companyInfo);



    }

    renderEdit(){
        var logoStyle = {width: '100px', height: '100px', backgroundColor: '#eee', border: '2px solid #e5e5e5'};

        var {company} = this.props;
        var services = service_types;

        let logImgTips, companyImgTips;
        if(!company.company_logo){
            logImgTips = (<div className="tips">只支持JPG、PNG、GIF、文件不超过5M</div>);
        }

        if(!company.company_img){
            companyImgTips = (<div className="block-tips">图片大小为1920*420px，只支持JPG、PNG、GIF、文件不超过5M</div>);
        }
        return (
            <div className="company-info-container">
                <form className="x-form" onSubmit={this.onDataSubmit.bind(this)}>
                    <div className="c-row">
                        <div className="c-label">公司Logo</div>
                        <div className="c-value">
                            <Upload ref="logo" className="x-upload logo-upload" text="添加图片" onStatusChange={this.onStatusChange.bind(this)} value={company.company_logo}></Upload>
                            {logImgTips}
                        </div>
                    </div>

                    <div className="c-row">
                        <div className="c-label">公司宣传图</div>
                        <div className="c-value">
                            <Upload ref="companyImg" className="broadcast-img-upload x-upload" text="添加图片" onStatusChange={this.onStatusChange.bind(this)} value={company.company_img}></Upload>
                            {companyImgTips}
                        </div>
                    </div>
                    <div className="c-row">
                        <div className="c-label">关键词</div>
                        <div className="c-value">
                            <input type="text" ref="keywords" className="c-input" defaultValue={company.keywords.join(',')}/>
                            <div className="block-tips">填写跟您业务相关的关键词，以便用户在搜索时能够找到您的公司，如果多个关键词，请用“,”分割开。</div>
                        </div>
                    </div>
                    <div className="c-row no-padding-top">
                        <div className="c-label pt-20">服务项目</div>
                        <div className="c-value pt-5">
                            <CheckBoxGroup ref="servicesType" group={services} value={company.services_type}></CheckBoxGroup>
                        </div>
                    </div>
                    <div className="c-row">
                        <div className="c-label">公司简介</div>
                        <div className="c-value">
                            <textarea className="c-introduce" rows="10" ref="description" defaultValue={company._description}></textarea>
                        </div>
                    </div>

                    <div className="x-btn-group">
                        <button className="x-save-btn" type="submit">保存</button>
                        <button className="x-cancel-btn ml-20" type="button" onClick={this.onShow.bind(this)}>取消</button>
                    </div>
                </form>
            </div>
        );
    }

    renderShow(){
        var {company} = this.props;
        return (
            <div className="company-info-container show-info">
                <div className="x-form">
                    <div className="c-row">
                        <div className="c-label">公司Logo</div>
                        <div className="c-value">
                            <img src={'/' + company.company_logo} alt="" className="company-logo" ref="test"/>
                        </div>
                    </div>

                    <div className="c-row">
                        <div className="c-label">公司宣传图</div>
                        <div className="c-value">
                            <img src={'/' + company.company_img} alt="" className="company-img"/>
                        </div>
                    </div>
                    <div className="c-row">
                        <div className="c-label">关键词</div>
                        <div className="c-value">
                            <div className="keywords">{company.keywords? company.keywords.join(','):''}</div>
                        </div>
                    </div>
                    <div className="c-row no-padding-top">
                        <div className="c-label pt-20">服务项目</div>
                        <div className="c-value pt-20">
                            {company.services_type? company.services_type.join(' '):''}
                        </div>
                    </div>
                    <div className="c-row">
                        <div className="c-label">公司简介</div>
                        <div className="c-value">
                            <div className="introduce">{company._description}</div>
                        </div>
                    </div>

                    <div className="x-btn-group">
                        <button className="x-edit-btn" type="button" onClick={this.onEdit.bind(this)}>编辑</button>
                    </div>
                </div>
            </div>
        );

    }
    render(){
        let {infoEdit} = this.props;
        if(infoEdit){
            return this.renderEdit();
        }
        return this.renderShow();
    }
}

function mapStateToProps({companyHome}){
    return {
        company: companyHome.company,
        infoEdit: companyHome.infoEdit
    };
}
export default connect(mapStateToProps, {
    pushState: pushState,
    updateCompany: updateCompany,
    updateView: updateView,
    showView: showView
})(CompanyInfo);