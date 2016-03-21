import React, {Component} from 'react';
import { connect, dispatch} from 'react-redux';
import {pushState} from 'redux-router';
import request from 'superagent';

import {CaseInfo} from './caseInfo';

function initCases(companyId){
    return dispatch => {
        request.get(`/api/companies/${companyId}/cases`)
            .end((err, res) => {
                if(err){
                    return console.log(err);
                }

                if(res.body.status == 0){
                    dispatch({
                        type: 'INIT_CASES',
                        cases: res.body.data
                    });
                }else{
                    return console.log(res.body.message);
                }
            });
    }

}

function deleteCase(companyId, caseId){
    return dispatch => {
        request.del(`/api/companies/${companyId}/cases`)
            .send({ids: [caseId]})
            .end((err, res) => {
                if(err){
                    return console.log(err);
                }

                if(res.body.status == 0){
                    dispatch({
                        type: 'DELETE_CASE_SUCCESS',
                        caseId: caseId
                    });
                }else{
                    return console.log(res.body.message);
                }
            });
    }
}


function putCase(caseId, info){
    return dispatch => {
        request.put(`/api/cases/${caseId}`).send(info).end((err, res) => {
            if(err){
                return console.log(err);
            }

            if(res.body.status == 0){
                dispatch({
                    type: 'CASE_PUT_SUCCESS',
                    caseId: caseId,
                    caseObj: res.body.data
                });
            }else{
                return console.log(res.body.message);
            }
        });

    }
}

function createCase(companyId, info){
    return dispatch => {
        request.post(`/api/companies/${companyId}/cases`).send(info).end((err, res) => {
            if(err){
                return console.log(err);
            }

            if(res.body.status == 0){
                dispatch({
                    type: 'CASE_CREATE_SUCCESS',
                    caseObj: res.body.data
                });
            }else{
                return console.log(res.body.message);
            }
        });
    }
}


class Cases extends Component{
    constructor(props){
        super(props);
        this.state = {
            dialogOptions: {
                isOpen: false
            }
        }
    }

    onCloseDialog(){
        this.setState({
            dialogOptions: {
                isOpen: false
            }
        });
    }
    componentDidMount(){
        var {initCases, company} = this.props;
        initCases(company._id);

    }
    componentWillReceiveProps(nextProps){
        let {caseDialogOpen} = nextProps;

        this.setState({
            dialogOptions: {
                isOpen: caseDialogOpen
            }
        });
    }


    onDelete(companyId, caseId){
        var {deleteCase} = this.props;
        deleteCase(companyId, caseId);
    }

    onEdit(caseItem){
        this.setState({
            dialogOptions: {
                isOpen: true,
                case: caseItem
            }
        });
    }
    onNew(){
        this.setState({
            dialogOptions: {
                isOpen: true
            }
        });
    }
    onDialogClose(){
        this.setState({
            dialogOptions: {
                isOpen: false
            }
        });
        console.log('cloase');
    }
    onSave(id, info){

        if(id){
            let {putCase} = this.props;
            putCase(id, info);
        }else{
            let {company, createCase} = this.props;
            createCase(company._id, info);
        }
    }

    render(){
        var {cases, company} = this.props;
        cases = cases || [];
        cases = cases.map((caseItem, index) => {
            return (
                <div className="item" key={caseItem._id}>
                    <div className="title inline-b"><a href="javascript:;">{caseItem.title}</a></div>
                    <div className="action-group inline-b">
                        <button className="btn-delete inline-b" onClick={this.onDelete.bind(this, company._id, caseItem._id)}>删除</button>
                        <button className="btn-edit inline-b" onClick={this.onEdit.bind(this, caseItem)}>编辑</button>
                    </div>
                </div>
            );
        });
        return (
            <div className="tab-container">
                <div className="head">
                    <div className="head-title inline-b">案例列表</div>
                    <div className="head-right-bar inline-b">操作</div>
                </div>
                <div className="list">
                    {cases}
                </div>
                <button className="g-btn-primary mt-40" onClick={this.onNew.bind(this)}>添加案例</button>
                <CaseInfo dialogOptions={this.state.dialogOptions} onDialogClose={this.onDialogClose.bind(this)} onSave={this.onSave.bind(this)}></CaseInfo>
            </div>
        );
    }
}

function mapStateToProps({companyHome}){
    return {
        company: companyHome.company,
        cases: companyHome.cases,
        caseDialogOpen: companyHome.caseDialogOpen
    };
}
let actions = {initCases, deleteCase, putCase, createCase};
export default connect(mapStateToProps, {
    pushState: pushState,
    ...actions
})(Cases);