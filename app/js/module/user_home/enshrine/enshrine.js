import React from 'react';
import { connect } from 'react-redux';
import {pushState} from 'redux-router';

import {InlineTags} from '../../../components/inline_tags';
import request from 'superagent';



function getEnshrines(){
    return dispatch => {
        request.get('/api/client/enshrines')
            .end((err, res) => {
                if(err){
                    return console.log(err);
                }

                if(res.body.status == 0){
                    dispatch({
                        type: 'INIT_ENSHRINES',
                        enshrines: res.body.data
                    });
                }else{
                    console.log(res.body.message)
                }
            });
    }
}

function onEnshrinesDelete(id){
    return dispatch => {
        request.del('/api/client/enshrines')
        .send({ids: [id]})
            .end( (err, res) => {
                if(err){
                    return console.log(err);
                }

                if(res.body.status == 0){
                    dispatch({
                        type: 'DELETE_ENSHRINES',
                        enshrineId: id
                    });
                }else{
                    console.log(res.body.message)
                }

            });
    }
}

class CompanyInfo extends React.Component{


    deleteEnshrine(id){
        var {onEnshrinesDelete} = this.props;
        onEnshrinesDelete(id);
    }

    render(){
        var {enshrine} = this.props;
        var company = enshrine.company;
        var services = (<InlineTags label="服务项目：" data={company.services_type}></InlineTags>);
        var name = (<InlineTags label="联系人：" data={[company.contacts]}></InlineTags>);
        var concat = (<InlineTags label="联系方式：" data={[company.phone_number]}></InlineTags>);
        return (
            <div className="en-item">
                <div className="head">{company.name}</div>
                <div className="body">
                    <div className="left-side inline">
                        <div className="services">{services}</div>
                        <div className="user-info">
                            <div className="user-name inline-b">{name}</div>
                            <div className="user-concat inline-b">{concat}</div>
                        </div>
                    </div>
                    <div className="right-side inline"><button onClick={this.deleteEnshrine.bind(this, enshrine._id)}>删除</button></div>
                </div>
            </div>
        );
    }
}

class Enshrine extends React.Component{

    componentDidMount(){
        var {getEnshrines} = this.props;
        getEnshrines();
    }

    deleteEnshrine(id){
        var {onEnshrinesDelete} = this.props;
        onEnshrinesDelete(id);
    }


    render(){

        var {enshrines} = this.props;
        enshrines = enshrines || [];

        enshrines = enshrines.map((item) =>{
            return (
                <CompanyInfo enshrine={item} onEnshrinesDelete={this.deleteEnshrine.bind(this)} key={item._id}></CompanyInfo>
            );
        });


        return (
            <div className="w-800 module-container enshrine-container">
                <div className="en-header">
                    <div className="nav-item"><a href="javascript:;" className="active">全部收藏</a></div>
                </div>
                <div className="en-list">
                    <div className="list-title">
                        <div className="inline-b en-title-content">内容</div>
                        <div className="inline-b en-title-action">状态</div>
                    </div>
                    <div className="list-container">
                        {enshrines}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        enshrines: state.userHome.enshrines
    };
}
export default connect(mapStateToProps, {
    pushState: pushState,
    getEnshrines: getEnshrines,
    onEnshrinesDelete: onEnshrinesDelete
})(Enshrine);