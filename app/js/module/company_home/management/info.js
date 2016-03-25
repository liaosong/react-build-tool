
import React, {Component} from 'react';
import { connect, dispatch} from 'react-redux';
import {pushState} from 'redux-router';
import ReactDOM from 'react-dom';
import Upload from '../../../components/upload';
//import CheckBox from '../../../components/checkbox';
import CheckBoxGroup from '../../../components/checkbox_group';

import {updateCompany} from '../../../actions/company_actions';
import {service_types, COMPANY_DEFAULT_LOGO, COMPANY_DEFAULT_WEB_IMG, TAGS_COLOR} from '../../../global_data';

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
        this.state = {
            tags: [],
            tagsError: ""
        }
    }

    componentDidMount(){
        var tags = this.props.company.tags || [];

        this.setState({
            tags: tags
        });
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

        var companyInfo = {
            company_logo: this.refs.logo.value,
            web_company_img: this.refs.companyImg.value,
            tags: this.state.tags,
            services_type: this.refs.servicesType.value,
            _description: this.refs.description.value
        }

        updateCompany(company._id, companyInfo);



    }
    addTag(){
        var tagVal = this.refs.tag.value;

        if(!tagVal){ return;}

        if(this.state.tags.length >= 10){
            this.setState({
                tagsError: "您最多只能为自己添加10个标签"
            });
            return;
        }

        if(this.state.tags.indexOf(tagVal) === -1){
            this.state.tags.push(tagVal)
            this.setState({
                tags: this.state.tags
            });
            this.refs.tag.value = "";
        }

    }
    removeTag(index){
        var tags = this.state.tags;
        tags.splice(index, 1);
        this.setState({
            tags: tags
        });
    }

    renderEdit(){
        var logoStyle = {width: '100px', height: '100px', backgroundColor: '#eee', border: '2px solid #e5e5e5'};

        var {company} = this.props;
        var services = service_types;

        let logImgTips, companyImgTips, tags;

        logImgTips = (<div className="tips">只支持JPG、PNG、GIF、文件不超过5M</div>);

        companyImgTips = (<div className="block-tips">图片大小为1920*420px，只支持JPG、PNG、GIF、文件不超过5M</div>);
        tags = this.state.tags.map((item, index) => {
            return (
                <li className="tag-item" key={index}><i className="delete" onClick={this.removeTag.bind(this, index)}></i><span className="tag-name">{item}</span></li>
            );
        });
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
                            <Upload ref="companyImg" className="broadcast-img-upload x-upload" text="添加图片" onStatusChange={this.onStatusChange.bind(this)} value={company.web_company_img}></Upload>
                            {companyImgTips}
                        </div>
                    </div>

                    <div className="c-row no-padding-top">
                        <div className="c-label pt-20">服务范围</div>
                        <div className="c-value pt-5">
                            <CheckBoxGroup ref="servicesType" group={services} value={company.services_type}></CheckBoxGroup>
                        </div>
                    </div>
                    <div className="c-row">
                        <div className="c-label">主营业务标签</div>
                        <div className="c-value">
                            <div className="tag-tool">
                                <input type="text" className="box-input" ref="tag"/>
                                <button className="blue-button g-blue-button" onClick={this.addTag.bind(this)} type="button">添加新标签</button>
                            </div>
                            <div className="tag-tips">
                                <a href="">您为什么要添加业务标签？</a><span>{this.state.tagsError}</span>
                            </div>

                            <ul className="tags-container cleanfix">
                                {tags}
                            </ul>
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
        var description = company._description || '';
        description = description.split(/\n/).map((item, index) => {
            return <p key={index}>{item}</p>
        });

        var logoUrl, webImgUrl, tags;
        logoUrl = company.company_logo || COMPANY_DEFAULT_LOGO;
        webImgUrl = company.web_company_img || COMPANY_DEFAULT_WEB_IMG;
        var colorArr = TAGS_COLOR;
        var firstIndex = Math.floor(Math.random() * colorArr.length);
        tags = this.state.tags.map((item, index) => {
            let currentIndex = firstIndex + index;
            var style = {
                backgroundColor: colorArr[currentIndex % colorArr.length]
            }
            return (
                <li style={style} key={index}>{item}</li>
            );
        })
        return (
            <div className="company-info-container show-info">
                <div className="x-form">
                    <div className="c-row">
                        <div className="c-label">公司Logo</div>
                        <div className="c-value">
                            <img src={'/' + logoUrl} alt="" className="company-logo" ref="test"/>
                        </div>
                    </div>

                    <div className="c-row">
                        <div className="c-label">公司宣传图</div>
                        <div className="c-value">
                            <img src={'/' + webImgUrl} alt="" className="company-img"/>
                        </div>
                    </div>

                    <div className="c-row no-padding-top">
                        <div className="c-label pt-20">服务范围</div>
                        <div className="c-value pt-20">
                            {company.services_type? company.services_type.join(' '):''}
                        </div>
                    </div>
                    <div className="c-row">
                        <div className="c-label">主营业务标签</div>
                        <div className="c-value">
                            <ul className="tag-show-container cleanfix">
                                {tags}
                            </ul>
                        </div>
                    </div>
                    <div className="c-row">
                        <div className="c-label">公司简介</div>
                        <div className="c-value">
                            <div className="introduce">{description}</div>
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