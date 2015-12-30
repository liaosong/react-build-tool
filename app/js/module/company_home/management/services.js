import React, {Component} from 'react';
import { connect, dispatch} from 'react-redux';
import {pushState} from 'redux-router';
import request from 'superagent';
import {ServiceInfo} from './serviceinfo';



function initServices(companyId){
    return dispatch => {
        request.get(`/api/companies/${companyId}/quotations`)
            .end((err, res) => {
                if(err){
                    return console.log(err);
                }

                if(res.body.status == 0){
                    dispatch({
                        type: 'INIT_SERVICES',
                        services: res.body.data
                    });
                }else{
                    return console.log(res.body.message);
                }
            });
    }

}

function deleteService(companyId, serviceId){
    return dispatch => {
        request.del(`/api/companies/${companyId}/quotations`)
            .send({ids: [serviceId]})
            .end((err, res) => {
                if(err){
                    return console.log(err);
                }

                if(res.body.status == 0){
                    dispatch({
                        type: 'DELETE_SERVICE_SUCCESS',
                        serviceId: serviceId
                    });
                }else{
                    return console.log(res.body.message);
                }
            });
    }
}


function putService(serviceId, info){
    return dispatch => {
        request.put(`/api/quotations/${serviceId}`).send(info).end((err, res) => {
            if(err){
                return console.log(err);
            }

            if(res.body.status == 0){
                dispatch({
                    type: 'SERVICE_PUT_SUCCESS',
                    serviceId: serviceId,
                    service: res.body.data
                });
            }else{
                return console.log(res.body.message);
            }
        });

    }
}

function createService(companyId, info){
    return dispatch => {
        request.post(`/api/companies/${companyId}/quotations`).send(info).end((err, res) => {
            if(err){
                return console.log(err);
            }

            if(res.body.status == 0){
                dispatch({
                    type: 'SERVICE_CREATE_SUCCESS',
                    service: res.body.data
                });
            }else{
                return console.log(res.body.message);
            }
        });
    }
}


class Service extends Component{
    constructor(props){
        super(props);
        this.state = {
            dialogOptions: {
                isOpen: true
            }
        }
    }

    componentDidMount(){
        var {initServices, company} = this.props;
        initServices(company._id);

    }

    componentWillReceiveProps(nextProps){
        let {serviceDialogOpen} = nextProps;

        this.setState({
            dialogOptions: {
                isOpen: serviceDialogOpen
            }
        });
    }


    onAdd(){
        this.setState({
            dialogOptions: {
                isOpen: true
            }
        });
    }
    onDelete(serviceId){
        var {company, deleteService} = this.props;
        deleteService(company._id, serviceId)
    }
    onEdit(item){
        this.setState({
            dialogOptions: {
                isOpen: true,
                service: item
            }
        });
    }
    onSave(serviceId, serviceInfo){
        if(serviceId){
            let {putService} = this.props;
            putService(serviceId, serviceInfo);

        }else{
            let {company, createService} = this.props;
            createService(company._id, serviceInfo);
        }
    }
    onDialogClose(){

    }

    render(){


        var {services, company} = this.props;
        services = services || [];
        services = services.map((serviceItem, index) => {
            return (
                <div className="item" key={serviceItem._id}>
                    <div className="title inline-b"><a href="javascript:;">{serviceItem.name}</a></div>
                    <div className="action-group inline-b">
                        <button className="btn-delete inline-b" onClick={this.onDelete.bind(this, serviceItem._id)}>删除</button>
                        <button className="btn-edit inline-b" onClick={this.onEdit.bind(this, serviceItem)}>编辑</button>
                    </div>
                </div>
            );
        });
        return (
            <div className="tab-container">
                <div className="head">
                    <div className="head-title inline-b">服务/产品列表</div>
                    <div className="head-right-bar inline-b">操作</div>
                </div>
                <div className="list">
                    {services}
                </div>
                <button className="g-btn-primary mt-40" onClick={this.onAdd.bind(this)}>添加服务/产品</button>
                <ServiceInfo dialogOptions={this.state.dialogOptions} onDialogClose={this.onDialogClose.bind(this)} onSave={this.onSave.bind(this)}></ServiceInfo>
            </div>
        );
    }
}

function mapStateToProps({companyHome}){
    return {
        services: companyHome.services,
        company: companyHome.company,
        serviceDialogOpen: companyHome.serviceDialogOpen
    };
}

let actions = {initServices, deleteService, putService, createService};
export default connect(mapStateToProps, {
    pushState: pushState,
    ...actions
})(Service);