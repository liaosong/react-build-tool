import React, {Component} from 'react';
import { connect, dispatch} from 'react-redux';
import {pushState} from 'redux-router';
import { Link, IndexLink} from 'react-router';

import * as companyActions from '../../../actions/company_actions';
import Select from 'react-select';
import request from 'superagent';

function updateCompanyInfo(id, company){
    return dispatch => {
        request.put('/api/companies/' + id)
            .send(company)
            .end((err, res) => {
                if(err) return console.log(err);

                if(res.body.status == 0){
                    dispatch({
                        type: 'COMPANY_INFO_UPDATE',
                        company: res.body.data
                    });
                }else{
                    console.log(res.body.message);
                }
            });
    }
}

class CompanyBase extends Component{


    onEdit(){
        var {updateView} = this.props;
        updateView();
    }

    onCancel(){
        var {showView} = this.props;
        showView();
    }

    updateCompany(id, e){
        e.preventDefault();
        console.log(arguments);

        var {updateCompanyInfo} = this.props;
        var city = this.refs.city.state.value;

        var company = {
            name: this.refs.name.value,
            address: this.refs.address.value,
            city: city,
            type: this.refs.type.value,
            contacts: this.refs.contacts.value,
            tel: this.refs.tel.value,
            email: this.refs.email.value
        }

        updateCompanyInfo(id, company);
    };


    renderEdit(){
        var {currentUser, company} = this.props;
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
            <div className="user-base-info">
                <form className="x-form" onSubmit={this.updateCompany.bind(this, company._id)}>
                    <div className="x-form-group">
                        <div className="x-label">注册电话</div>
                        <div className="x-value">{currentUser.phone_number}</div>
                        <div className="x-tips">用户登录，不能修改</div>
                    </div>
                    <div className="x-form-group">
                        <div className="x-label">公司名称</div>
                        <div className="x-value">
                            <input ref="name" type="text" className="x-form-control" defaultValue={company.name} placeholder="请输入公司名称"/>
                        </div>
                        <div className="x-tips"></div>
                    </div>
                    <div className="x-form-group">
                        <div className="x-label">公司详细地址</div>
                        <div className="x-value">
                            <input ref="address" type="text" className="x-form-control" defaultValue={company.address} placeholder="请输入公司详细地址"/>
                        </div>
                        <div className="x-tips"></div>
                    </div>
                    <div className="x-form-group">
                        <div className="x-label">所在城市</div>
                        <div className="x-value">
                            <Select options={cities} ref="city" value={company.city} className="select-form-control" placeholder="请选择"></Select>
                        </div>
                        <div className="x-tips"></div>
                    </div>
                    <div className="x-form-group">
                        <div className="x-label">服务类型</div>
                        <div className="x-value">
                            <Select options={serviceTypes} ref="type" value={company.type} className="select-form-control" placeholder="请选择"></Select>
                        </div>
                        <div className="x-tips"></div>
                    </div>
                    <div className="x-form-group">
                        <div className="x-label">联系人</div>
                        <div className="x-value">
                            <input ref="contacts" type="text" className="x-form-control" defaultValue={company.contacts} placeholder="请输入联系人"/>
                        </div>
                        <div className="x-tips"></div>
                    </div>
                    <div className="x-form-group">
                        <div className="x-label">固话</div>
                        <div className="x-value">
                            <input ref="tel" type="text" className="x-form-control" defaultValue={company.tel} placeholder="请输入固定电话"/>
                        </div>
                        <div className="x-tips"></div>
                    </div>
                    <div className="x-form-group">
                        <div className="x-label">邮箱</div>
                        <div className="x-value">
                            <input ref="email" type="text" className="x-form-control" defaultValue={company.email} placeholder="请输入邮箱"/>
                        </div>
                        <div className="x-tips"></div>
                    </div>

                    <div className="x-btn-group">
                        <button className="x-save-btn" type="submit">保存</button>
                        <button className="x-cancel-btn ml-20" type="button" onClick={this.onCancel.bind(this)}>取消</button>
                    </div>
                </form>
            </div>
        );

    }

    renderShow(){
        var {currentUser, company} = this.props;
        return (
            <div className="user-base-info">
                <div className="x-form">
                    <div className="x-form-group">
                        <div className="x-label">注册电话</div>
                        <div className="x-value">{currentUser.phone_number}</div>
                        <div className="x-tips">用户登录，不能修改</div>
                    </div>
                    <div className="x-form-group">
                        <div className="x-label">公司名称</div>
                        <div className="x-value">{company.name || "未填写"}</div>
                        <div className="x-tips"></div>
                    </div>
                    <div className="x-form-group">
                        <div className="x-label">公司详细地址</div>
                        <div className="x-value">{company.address || "未填写"}</div>
                        <div className="x-tips"></div>
                    </div>
                    <div className="x-form-group">
                        <div className="x-label">所在城市</div>
                        <div className="x-value">{company.city || "未填写"}</div>
                        <div className="x-tips"></div>
                    </div>
                    <div className="x-form-group">
                        <div className="x-label">服务类型</div>
                        <div className="x-value">{company.type == "full" ? "一站式服务公司" : "专业性服务公司"}</div>
                        <div className="x-tips"></div>
                    </div>
                    <div className="x-form-group">
                        <div className="x-label">联系人</div>
                        <div className="x-value">{company.contacts || "未填写"}</div>
                        <div className="x-tips"></div>
                    </div>
                    <div className="x-form-group">
                        <div className="x-label">固话</div>
                        <div className="x-value">{company.tel || "未填写"}</div>
                        <div className="x-tips"></div>
                    </div>
                    <div className="x-form-group">
                        <div className="x-label">邮箱</div>
                        <div className="x-value">{company.email || "未填写"}</div>
                        <div className="x-tips"></div>
                    </div>

                    <div className="x-btn-group">
                        <button className="x-edit-btn" type="button" onClick={this.onEdit.bind(this)}>编辑</button>
                    </div>
                </div>
            </div>
        );
    }

    render(){
        if(this.props.editing) return this.renderEdit();
        return this.renderShow();
    }
}

function mapStateToProps({userHome, companyHome}){

    return {
        currentUser: userHome.currentUser,
        company: companyHome.company,
        editing: companyHome.editing
    };
}
export default connect(mapStateToProps, {
    pushState: pushState,
    ...companyActions,
    updateCompanyInfo: updateCompanyInfo
})(CompanyBase);