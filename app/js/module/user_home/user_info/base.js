import React from 'react';
import { connect, dispatch} from 'react-redux';
import {pushState} from 'redux-router';
import { bindActionCreators } from 'redux';
import * as UserActionCreators from '../../../actions/user_actions';

class UserInfoBase extends React.Component {
    constructor(props, context){
        super(props, context);
        this.state = {
            editing: false
        }

    }

    userInfoUpdate(e){
        e.preventDefault();
        var refs = this.refs;
        const {updateUser} = this.props;
        var userInfo = {
            name: refs.name.value,
            company_name: refs.company_name.value,
            contact: refs.contact.value,
            contact_way: refs.contact_way.value,
            tel: refs.tel.value,
            email: refs.email.value
        }
        updateUser(userInfo);
        return false;
    }
    onEdit(e){
        e.preventDefault();
        var {updateView} = this.props;
        updateView();
    }

    onCancel(e){
        e.preventDefault();
        var {showView} = this.props;
        showView();
    }

    renderEdit(){
        var {currentUser} = this.props;
        return (
            <div className="user-base-info">
                <form onSubmit={this.userInfoUpdate.bind(this)} className="x-form">
                    <div className="x-form-group">
                        <div className="x-label">注册电话</div>
                        <div className="x-value">{currentUser.phone_number}</div>
                        <div className="x-tips">用户登录，不能修改</div>
                    </div>
                    <div className="x-form-group">
                        <div className="x-label">昵称</div>
                        <div className="x-value">
                            <input ref="name" type="text" className="x-form-control" defaultValue={currentUser.name} placeholder="请输入昵称"/>
                        </div>
                        <div className="x-tips"></div>
                    </div>
                    <div className="x-form-group">
                        <div className="x-label">公司名称</div>
                        <div className="x-value">
                            <input ref="company_name" type="text" className="x-form-control" defaultValue={currentUser.company_name} placeholder="请输入公司名称"/>
                        </div>
                        <div className="x-tips"></div>
                    </div>
                    <div className="x-form-group">
                        <div className="x-label">联系人</div>
                        <div className="x-value">
                            <input ref="contact" type="text" className="x-form-control" defaultValue={currentUser.contact} placeholder="请输入联系人"/>
                        </div>
                        <div className="x-tips"></div>
                    </div>
                    <div className="x-form-group">
                        <div className="x-label">联系方式</div>
                        <div className="x-value">
                            <input ref="contact_way" type="text" className="x-form-control" defaultValue={currentUser.contact_way} placeholder="请输入联系方式"/>
                        </div>
                        <div className="x-tips"></div>
                    </div>
                    <div className="x-form-group">
                        <div className="x-label">固定电话</div>
                        <div className="x-value">
                            <input ref="tel" type="text" className="x-form-control" defaultValue={currentUser.tel} placeholder="请输入固定电话"/>
                        </div>
                        <div className="x-tips"></div>
                    </div>
                    <div className="x-form-group">
                        <div className="x-label">邮箱</div>
                        <div className="x-value">
                            <input ref="email" type="text" className="x-form-control" defaultValue={currentUser.email} placeholder="请输入常用邮箱"/>
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
        var {currentUser} = this.props;
        return (
            <div className="user-base-info">
                <form onSubmit={this.userInfoUpdate.bind(this)} className="x-form">
                    <div className="x-form-group">
                        <div className="x-label">注册电话</div>
                        <div className="x-value">{currentUser.phone_number}</div>
                        <div className="x-tips">用户登录，不能修改</div>
                    </div>
                    <div className="x-form-group">
                        <div className="x-label">昵称</div>
                        <div className="x-value">{currentUser.name || "未填写"}</div>
                        <div className="x-tips"></div>
                    </div>
                    <div className="x-form-group">
                        <div className="x-label">公司名称</div>
                        <div className="x-value">{currentUser.company_name || "未填写"}</div>
                        <div className="x-tips"></div>
                    </div>
                    <div className="x-form-group">
                        <div className="x-label">联系人</div>
                        <div className="x-value">{currentUser.contact || "未填写"}</div>
                        <div className="x-tips"></div>
                    </div>
                    <div className="x-form-group">
                        <div className="x-label">联系方式</div>
                        <div className="x-value">{currentUser.contact_way || "未填写"}</div>
                        <div className="x-tips"></div>
                    </div>
                    <div className="x-form-group">
                        <div className="x-label">固定电话</div>
                        <div className="x-value">{currentUser.tel || "未填写"}</div>
                        <div className="x-tips"></div>
                    </div>
                    <div className="x-form-group">
                        <div className="x-label">邮箱</div>
                        <div className="x-value">{currentUser.email || "未填写"}</div>
                        <div className="x-tips"></div>
                    </div>

                    <div className="x-btn-group">
                        <button className="x-edit-btn" type="button" onClick={this.onEdit.bind(this)}>编辑</button>
                    </div>
                </form>
            </div>
        );
    }
    render(){
        if(this.props.editing) return this.renderEdit();
        return this.renderShow();

    }
}

function mapStateToProps(state){
    return {
        currentUser: state.userHome.currentUser,
        editing: state.userHome.editing
    };
}
export default connect(mapStateToProps, {
    pushState: pushState,
    ...UserActionCreators
})(UserInfoBase);
