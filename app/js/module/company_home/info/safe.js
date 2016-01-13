import React from 'react';
import { connect } from 'react-redux';
import {pushState} from 'redux-router';
import * as UserActionCreators from '../../../actions/user_actions';

class CompanyInfoSafe extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            change: false
        };
    }

    onEdit(){
        var {pwdEdit} = this.props;
        pwdEdit();
    }

    onCancel(){
        var {pwdView} = this.props;
        pwdView();
    }

    passwordChange(e){
        e.preventDefault();
        var {changePassword} = this.props;
        var password = this.refs.password.value;
        var new_password = this.refs.new_password.value;
        var new_password_ref = this.refs.new_password_ref.value;
        if(new_password === new_password_ref){
            changePassword({
                old_password: password,
                password: new_password
            });
        }else{
            alert('两次输入密码不一致');
        }

    }

    renderChange(){
        var {currentUser} = this.props;
        return (
            <div className="user-base-info">
                <form className="x-form" onSubmit={this.passwordChange.bind(this)}>
                    <div className="x-form-group">
                        <div className="x-label">登陆账户</div>
                        <div className="x-value">{currentUser.phone_number}</div>
                        <div className="x-tips">用户登录，不能修改</div>
                    </div>
                    <div className="x-form-group">
                        <div className="x-label">当前密码</div>
                        <div className="x-value">
                            <input ref="password" type="password" className="x-form-control" placeholder="请输入密码"/>
                        </div>
                        <div className="x-tips error">{this.props.errorMessage}</div>
                    </div>
                    <div className="x-form-group">
                        <div className="x-label">新密码</div>
                        <div className="x-value">
                            <input ref="new_password" type="password" className="x-form-control" placeholder="请输入新密码"/>
                        </div>
                        <div className="x-tips"></div>
                    </div>
                    <div className="x-form-group">
                        <div className="x-label">再次输入新密码</div>
                        <div className="x-value">
                            <input ref="new_password_ref" type="password" className="x-form-control" placeholder="再次输入新密码"/>
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
                <form className="x-form">
                    <div className="x-form-group">
                        <div className="x-label">登陆账户</div>
                        <div className="x-value">{currentUser.phone_number}</div>
                        <div className="x-tips">用户登录，不能修改</div>
                    </div>
                    <div className="x-form-group">
                        <div className="x-label">登陆密码</div>
                        <div className="x-value">......</div>
                        <div className="x-tips"></div>
                    </div>
                    <div className="x-btn-group">
                        <button className="x-edit-btn" type="button" onClick={this.onEdit.bind(this)}>修改密码</button>
                    </div>
                </form>
            </div>
        );
    }

    render(){
        if(this.props.change) return this.renderChange();
        return this.renderShow();
    }
}

function mapStateToProps(state){
    return {
        currentUser: state.userHome.currentUser,
        change: state.userHome.change,
        errorMessage: state.userHome.errorMessage
    };
}
export default connect(mapStateToProps, {
    pushState: pushState,
    ...UserActionCreators
})(CompanyInfoSafe);