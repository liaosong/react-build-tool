import React from 'react';
import { connect } from 'react-redux';

export class UserInfoBase extends React.Component {
    constructor(props){
        super(props);
    }

    userInfoUpdate(e){
        e.preventDefault();


    }
    render(){
        return (
            <div className="user-base-info">
                <form onSubmit={this.userInfoUpdate.bind(this)} className="x-form">
                    <div className="x-form-group">
                        <div className="x-label">注册电话</div>
                        <div className="x-value">18782972908</div>
                        <div className="x-tips">用户登录，不能修改</div>
                    </div>
                    <div className="x-form-group">
                        <div className="x-label">昵称</div>
                        <div className="x-value"></div>
                        <div className="x-tips"></div>
                    </div>
                    <div className="x-form-group">
                        <div className="x-label">公司名称</div>
                        <div className="x-value"></div>
                        <div className="x-tips"></div>
                    </div>
                    <div className="x-form-group">
                        <div className="x-label">联系人</div>
                        <div className="x-value"></div>
                        <div className="x-tips"></div>
                    </div>
                    <div className="x-form-group">
                        <div className="x-label">联系方式</div>
                        <div className="x-value"></div>
                        <div className="x-tips"></div>
                    </div>
                    <div className="x-form-group">
                        <div className="x-label">固定电话</div>
                        <div className="x-value"></div>
                        <div className="x-tips"></div>
                    </div>
                    <div className="x-form-group">
                        <div className="x-label">邮箱</div>
                        <div className="x-value"></div>
                        <div className="x-tips"></div>
                    </div>
                </form>
            </div>
        );
    }
}
