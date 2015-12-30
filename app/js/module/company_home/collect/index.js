import React, {Component} from 'react';
import { connect, dispatch} from 'react-redux';
import {pushState} from 'redux-router';
import request from 'superagent';
import moment from 'moment';

import {InlineTags} from '../../../components/inline_tags';

function timeFormat(time){
    return moment(time).format('YYYY-MM-DD');
}


function initTender(){
    return dispatch => {
        request.get(`/api/tenders`)
            .end((err, res) => {
                if(err){
                    return console.log(err);
                }

                if(res.body.status == 0){
                    dispatch({
                        type: 'INIT_TENDER',
                        tenders: res.body.data
                    });
                }else{
                    return console.log(res.body.message);
                }
            });
    }

}

class TenderInfo extends Component{


    renderMeeting(){
        var {tender} = this.props;
        var time = (<InlineTags label="会议时间：" data={[timeFormat(tender.begin_date)]}></InlineTags>);
        var meetingCity = (<InlineTags label="会议城市：" data={[tender.address]}></InlineTags>);
        var joinNum = (<InlineTags label="参加人数：" data={[`${tender.min_join_num} — ${tender.max_join_num}`]}></InlineTags>);
        var budget = (<InlineTags label="会议预算：" data={[tender.budget]}></InlineTags>);
        var others = (<InlineTags label="详情：" data={[tender.others]}></InlineTags>);
        return (
            <div className="tender-item">
                <div className="head">
                    <div className="inline-b head-title">{tender.title}</div>
                    <div className="inline-b head-create-time">{timeFormat(tender.created_at)}</div>
                </div>
                <div className="body">
                    <div className="left-side inline">
                        <div className="info-row">
                            <div className="row-left inline-b">{time}</div>
                            <div className="row-right inline-b">{meetingCity}</div>
                        </div>
                        <div className="info-row">
                            <div className="row-left inline-b">{joinNum}</div>
                            <div className="row-right inline-b">{budget}</div>
                        </div>
                        <div className="info-row">{others}</div>
                    </div>
                    <div className="right-side inline">
                        <div className="user-info">
                            <div className="concat-name">{tender.contacts}</div>
                            <div className="concat-phone">{tender.tel}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderExhibition(){
        var {tender} = this.props;
        var time = (<InlineTags label="参展时间：" data={[`${timeFormat(tender.begin_date)} — ${timeFormat(tender.end_date)}`]}></InlineTags>);
        var city = (<InlineTags label="展览城市：" data={[tender.address]}></InlineTags>);
        var area = (<InlineTags label="展位面积：" data={[tender.booth_area]}></InlineTags>);
        var budget = (<InlineTags label="会议预算：" data={[tender.budget]}></InlineTags>);
        var others = (<InlineTags label="详情：" data={[tender.others]}></InlineTags>);
        return (
            <div className="tender-item">
                <div className="head">
                    <div className="inline-b head-title">{tender.title}</div>
                    <div className="inline-b head-create-time">{timeFormat(tender.created_at)}</div>
                </div>
                <div className="body">
                    <div className="left-side inline">
                        <div className="info-row">
                            <div className="row-left inline-b">{time}</div>
                            <div className="row-right inline-b">{city}</div>
                        </div>
                        <div className="info-row">
                            <div className="row-left inline-b">{area}</div>
                            <div className="row-right inline-b">{budget}</div>
                        </div>
                        <div className="info-row">{others}</div>
                    </div>
                    <div className="right-side inline">
                        <div className="concat-name">{tender.contacts}</div>
                        <div className="concat-phone">{tender.tel}</div>
                    </div>
                </div>
            </div>
        );
    }
    render(){
        var {tender} = this.props;
        if(tender.category == '会议'){
            return this.renderMeeting();
        }else{
            return this.renderExhibition();
        }
    }
}

class Collect extends Component{

    componentDidMount(){
        var {initTender} = this.props;
        initTender();
    }


    render(){
        var {tenders} = this.props;
        tenders = tenders || [];
        tenders = tenders.map((tender) => {
            return (<TenderInfo key={tender._id} tender={tender}></TenderInfo>);
        })
        return (
            <div className="w-800 module-container collect-container">
                <div className="en-header">
                    <div className="nav-item"><a href="javascript:;" className="active">全部需求</a></div>
                </div>
                <div className="module-list">
                    <div className="list-title">
                        <div className="inline-b item-title co-title-content">内容</div>
                        <div className="inline-b item-title right-items co-title-action">联系方式</div>
                    </div>
                    <div className="list-container">
                        {tenders}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({companyHome}){
    return {
        tenders: companyHome.tenders
    };
}
export default connect(mapStateToProps, {
    pushState: pushState,
    initTender: initTender
})(Collect);