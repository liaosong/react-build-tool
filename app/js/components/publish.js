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


    onCreateTender(){
        var {currentUser, dispatch} = this.props;
        if(!currentUser){
            dispatch({
                type: 'OPEN_LOGIN_DIALOG'
            })
        }else{
            this.setState({
                tenderDialogOpen: true
            });
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


    render(){
        var dialogStyle = {
            content:{
                width: '600px',
                height: '360px',
                top: "calc(50% - 180px)",
                left: "calc(50% - 300px)",
                border: 'none'
            },
            overlay:{
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
        return (
            <div className="publish inline-b">
                <button onClick={this.onCreateTender.bind(this)}>发布需求</button>
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