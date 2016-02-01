import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

class Publish extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tenderDialogOpen: false
        }
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


    onCreateTender(){
        var {currentUser, dispatch} = this.props;
        if(!currentUser){
            dispatch({
                type: 'OPEN_LOGIN_DIALOG'
            })
        }else{

            if(currentUser.u_type == 'company'){
                this.openErrorDialog();
            }else{
                this.setState({
                    tenderDialogOpen: true
                });
            }

        }
    }
    getTenderPage(type){
        if(type == 'meeting'){
            location.href = '/tender?type=meeting';
        }else{
            location.href = '/tender?type=exhibition';
        }
    }
    closeDialog(){
        this.setState({
            tenderDialogOpen: false
        });
    }

    closeErrorDialog(){
        this.setState({
            errorDialogOpen: false
        });
    }
    openErrorDialog(){
        this.setState({
            errorDialogOpen: true,
            tenderDialogOpen: false
        });
    }


    render(){
        if(this.state.errorDialogOpen || this.state.tenderDialogOpen){
            this.toggleClass2body(true);
        }else{
            this.toggleClass2body(false);
        }
        var dialogStyle = {
            content:{
                width: '600px',
                height: '360px',
                top: "calc(50% - 180px)",
                left: "calc(50% - 300px)",
                border: 'none',
                borderRadius: 'none',
                boxShadow: '0px 1px 5px rgba(0,0,0,.3)',

            },
            overlay:{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                overflowY: 'scroll',
                width: '100%',
                height: '100%',
            }
        }

        var errorDialog = {
            content:{
                width: '600px',
                height: '240px',
                top: "calc(50% - 120px)",
                left: "calc(50% - 300px)",
                border: 'none',
                borderRadius: 'none',
                boxShadow: '0px 1px 5px rgba(0,0,0,.3)'
            },
            overlay:{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                overflowY: 'scroll',
                width: '100%',
                height: '100%',
            }
        }

        return (
            <div className="publish inline-b">
                <button onClick={this.onCreateTender.bind(this)} className="publish-button g-blue-button">发布需求</button>
                <Modal isOpen={this.state.tenderDialogOpen} style={dialogStyle} className="tender-type-container">
                    <div className="head">请选择需求类型</div>
                    <div className="type-container">
                        <div className="inline-b meeting" onClick={this.getTenderPage.bind(this, 'meeting')}>
                            <div className="type-img"></div>
                            <div className="type-name">发布会议</div>
                        </div>
                        <div className="inline-b exhibition" onClick={this.getTenderPage.bind(this, 'exhibition')}>
                            <div className="type-img"></div>
                            <div className="type-name">发布展览</div></div>
                    </div>
                    <div className="close" onClick={this.closeDialog.bind(this)}></div>
                </Modal>

                <Modal isOpen={this.state.errorDialogOpen} style={errorDialog} className="error-dialog" onRequestClose={this.closeErrorDialog.bind(this)}>
                    <div className="head">错误提示</div>
                    <p className="title">对不起！</p>
                    <p className="tips">我们暂未开通服务商的需求发布功能。</p>

                    <button className="g-btn-primary" onClick={this.closeErrorDialog.bind(this)}>确定</button>
                    <div className="close" onClick={this.closeErrorDialog.bind(this)}></div>
                </Modal>
            </div>
        );
    }
}

function storeToProps({authService}) {
    return {
        currentUser: authService.currentUser
    };
}

export default connect(storeToProps)(Publish);