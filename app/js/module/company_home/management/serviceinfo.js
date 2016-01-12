import React, {Component} from 'react';
import Modal from 'react-modal';
import {Datepicker} from "../../../components/datepicker";
import {service_types} from '../../../global_data';
import CheckBoxGroup from '../../../components/checkbox_group';
import Upload from '../../../components/upload';

export class ServiceInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isOpen: false
        }
    }

    componentDidMount(){

    }
    componentWillReceiveProps(nextProps){
        let {dialogOptions} = nextProps;
        this.setState({
            isOpen: dialogOptions.isOpen,
            service: dialogOptions.service
        });
    }
    onRequestClose(){
        this.setState({
            isOpen: false
        });
    }


    saveService(e){
        e.preventDefault();
        var {name, price, imgUrls} = this.refs;
        imgUrls = imgUrls.value.map((item) => {
            return {url: item}
        })
        var serviceInfo = {
            name: name.value,
            price: price.value,
            img_urls: imgUrls
        };

        let {onSave} = this.props;

        if(this.state.service && this.state.service._id){
            onSave(this.state.service._id, serviceInfo);
        }else{
            onSave(null, serviceInfo);
        }
    }



    render(){
        let {dialogOptions, onDialogClose} = this.props;
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

        let service = this.state.service || {};


        return (
            <Modal isOpen={this.state.isOpen} style={dialogStyle} onRequestClose={this.onRequestClose.bind(this)}>
                <div className="w-1000 s-center">
                    <form className="x-form j8-form" onSubmit={this.saveService.bind(this)}>
                        <div className="form-row-group">
                            <label className="j8-label">标题</label>
                            <input type="text" className="form-row-control j8-input full-w" ref="name" defaultValue={service.name}/>
                            <p className="tips">如灯光设备，摄影摄像机，模特，礼仪，翻译等</p>
                        </div>

                        <div className="form-row-group">
                            <label className="j8-label">价格</label>
                            <input type="text" className="form-row-control j8-input full-w" ref="price" defaultValue={service.price}/>
                            <p className="tips">如300元/天，500元/天</p>
                        </div>
                        <div className="form-row-group">
                            <label className="j8-label">产品图片</label>
                            <p className="tips inline ml-0">添加产品服务图片，让用户更加了解您的实力！只支持jpg,png,gif格式，文件大小不超过5M</p>
                            <Upload multiple className="ml-120 mt-15" ref="imgUrls" value={service.img_urls}></Upload>
                        </div>
                        <hr className="line"/>
                        <div className="x-btn-group">
                            <button className="x-save-btn" type="submit">保存</button>
                            <button className="x-cancel-btn ml-20" type="button" onClick={this.onRequestClose.bind(this)}>取消</button>
                        </div>

                    </form>
                </div>
            </Modal>
        );
    }
}
