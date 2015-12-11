import React from 'react';
import { connect } from 'react-redux';

export class UserInfoSafe extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            change: false
        };
    }

    onEdit(){
        this.setState({
            change: true
        });
    }

    onCancel(){
        this.setState({
            change: false
        });
    }

    renderChange(){
        return (
            <div className="user-base-info">
                <form className="x-form">
                    <div className="x-form-group">
                        <div className="x-label">登陆账户</div>
                        <div className="x-value">xxxxxxx</div>
                        <div className="x-tips">用户登录，不能修改</div>
                    </div>
                    <div className="x-form-group">
                        <div className="x-label">当前密码</div>
                        <div className="x-value">
                            <input ref="password" type="password" className="x-form-control" placeholder="请输入密码"/>
                        </div>
                        <div className="x-tips"></div>
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
        return (
            <div className="user-base-info">
                <form className="x-form">
                    <div className="x-form-group">
                        <div className="x-label">登陆账户</div>
                        <div className="x-value">xxxx</div>
                        <div className="x-tips">用户登录，不能修改</div>
                    </div>
                    <div className="x-form-group">
                        <div className="x-label">登陆密码</div>
                        <div className="x-value">xxxx</div>
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
        if(this.state.change) return this.renderChange();
        return this.renderShow();
    }
}