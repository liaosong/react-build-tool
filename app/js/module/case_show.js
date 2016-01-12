import React, {Component} from 'react';
import Modal from 'react-modal';
import {Gallery} from '../components/gallery';
import moment from 'moment';


export class CaseShow extends Component{
    constructor(props){
        super(props);
        this.state = {
            isOpen: false,
            caseInfo: null

        }
    }

    componentDidMount(){

    }
    componentWillReceiveProps(nextProps){
        var {caseInfo} = nextProps;
        if(caseInfo){
            this.setState({
                caseInfo: caseInfo,
                isOpen: true
            });
        }
    }
    onRequestClose(){
        this.setState({
            isOpen: false
        });
    }



    render(){
        let {dialogOptions, onDialogClose} = this.props;
        var {caseInfo} = this.state;
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

        var imgUrls;
        if(caseInfo){
            imgUrls = this.state.caseInfo.img_urls.map((item) => {
                return '/' + item.url;
            });
        }else{
            return (
                <div className="no-case"></div>
            );
        }



        return (
            <Modal isOpen={this.state.isOpen} style={dialogStyle} onRequestClose={this.onRequestClose.bind(this)}>
                <div className="info-show-container">
                    <Gallery images={imgUrls || []}></Gallery>
                    <div className="w-1000 s-center case-info">
                        <div className="body">
                            <div className="name">{caseInfo.title}</div>
                            <div className="case-item first">
                                <div className="label inline-b">举办日期：</div>
                                <div className="value inline-b">{moment(caseInfo.begin_date).format('YYYY-MM-DD')}</div>
                            </div>
                            <div className="case-item">
                                <div className="label inline-b">参与人数：</div>
                                <div className="value inline-b">{caseInfo.joined_num}</div>
                            </div>
                            <div className="case-item">
                                <div className="label inline-b">举办地点：</div>
                                <div className="value inline-b">{caseInfo.address}</div>
                            </div>
                            <div className="case-item">
                                <div className="label inline-b">服务范围：</div>
                                <div className="value inline-b">{caseInfo.service_type.join(' ')}</div>
                            </div>

                            <div className="description">{caseInfo._description}</div>

                        </div>
                    </div>
                    <div className="x-close" onClick={this.onRequestClose.bind(this)}></div>
                </div>
            </Modal>
        );
    }
}
