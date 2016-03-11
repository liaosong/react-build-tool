import $ from 'jquery';

import citySelecter from '../js/components/jquery_city_selecter';
import Login from '../js/components/jquery_login';
import Modal from '../js/components/jquery.dialog';
import request from 'superagent';
import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {CaseShow} from './module/case_show';
import CommentAdd from './components/comment_add';
import classNames from 'classnames';
import moment from 'moment';
import {Star} from './components/star';
$.fn.citySelecter = citySelecter;
$.fn.modal = Modal;


const CASE_PAGE_SIZE = 6;
const QUOTATION_SIZE = 8;
const COMMENT_SIZE = 10;


function enshrines(companyId, cb){
    request.post("/api/client/enshrines").send({company: companyId})
        .end((err, res) => {
            if(err){
                return console.log(err);
            }

            if(res.body.status == 0){
                cb();
            }else{
                console.log(res.body.message);
            }
        });

}
function unEnshrines(companyId, cb){
    request.del('/api/client/enshrines/cancel')
        .send({company: companyId})
        .end((err, res) => {
            if(err){
                return console.log(err);
            }

            if(res.body.status == 0){
                cb();
            }else{
                console.log(res.body.message);
            }
        });
}

class CaseContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            caseShowOpen: false,
            selectCase: null,
            cases: this.props.cases || []
        }
    }
    loadMoreCase(){
        var {companyId, casesCount} = this.props;
        if(this.state.cases.length >= casesCount){
            return;
        }
        var page = Math.floor(this.state.cases.length/CASE_PAGE_SIZE) + 1;
        request.get(`/api/companies/${companyId}/cases?page_size=${CASE_PAGE_SIZE}&page=${page}`)
            .end((err, res) => {
                if(err){
                    return console.log(err);
                }

                if(res.body.status == 0){
                    this.setState({
                        cases: this.state.cases.concat(res.body.data)
                    });
                }else{
                    console.log(res.body.message);
                }
            });
    }

    showCase(caseObj){
        this.setState({
            selectCase: caseObj,
            caseShowOpen: true
        });
    }

    hideCaseHander(){
        this.setState({
            caseShowOpen: false
        });
    }


    render(){
        var {casesCount} = this.props;
        var cases = this.state.cases;

        cases = cases.map((caseInfo, index) => {
            var caseImg = caseInfo.img_urls.length >= 1 ? '/' + caseInfo.img_urls[0].url : '';
            return (
                <div className="case-item inline" onClick={this.showCase.bind(this, caseInfo)} key={index}>
                    <img src={caseImg} alt="" className="case-img"/>
                    <div className="case-title overflow-ellipsis">{caseInfo.title}</div>
                </div>
            );

        });

        return (
            <div>
                <div className="section-title">成功案例展示</div>
                <div className="cases-container">
                    {cases}
                </div>
                <button className={classNames("btn-load-more", {'show': casesCount > cases.length})} onClick={this.loadMoreCase.bind(this)}>查看更多</button>
                <CaseShow caseInfo={this.state.selectCase} className="case-show-container" isOpen={this.state.caseShowOpen} hideCaseHander={this.hideCaseHander.bind(this)}></CaseShow>
            </div>
        );

    }
}

class QuotationContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            quotations: this.props.quotations
        }
    }

    loadMoreService(){
        var {companyId, quotationsCount} = this.props;
        if(this.state.quotations.length >= quotationsCount){
            return;
        }
        var page = Math.floor(this.state.quotations.length/QUOTATION_SIZE) + 1;
        request.get(`/api/companies/${companyId}/quotations?page_size=${QUOTATION_SIZE}&page=${page}`)
            .end((err, res) => {
                if(err){
                    return console.log(err);
                }

                if(res.body.status == 0){
                    this.setState({
                        quotations: this.state.quotations.concat(res.body.data)
                    });
                }else{
                    console.log(res.body.message);
                }
            });
    }

    render(){

        var {quotationsCount} = this.props;
        var quotations = this.state.quotations;
        quotations = quotations.map((quotation, index) => {
            var quotationImg = quotation.img_urls.length >= 1 ? '/' + quotation.img_urls[0].url : '';
            return (
                <div className="quotation-item inline" key={index}>
                    <img src={quotationImg} alt="" className="quotation-img"/>
                    <div className="quotation-info">
                        <div className="name overflow-ellipsis">{quotation.name}</div>
                        <div className="price">{quotation.price}</div>
                    </div>
                </div>
            );
        });



        return (
            <div>
                <div className="section-title">产品或服务</div>
                <div className="services-container">
                    {quotations}
                </div>
                <button className={classNames("btn-load-more", {'show': quotationsCount > quotations.length})} onClick={this.loadMoreService.bind(this)}>查看更多</button>
            </div>
        );
    }
}

class CommentContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            commentDialogOpen: false,
            comments: this.props.comments || []
        }
    }

    showCommentAdd(e){
        var {userId} = this.props;
        if(!userId){
            //var event = new Event('openLoginDialog');
            //event.dispatchEvent(event);
        }
        this.setState({
            commentDialogOpen: true
        });
    }
    createComment(comment){
        var {companyId, userId} = this.props;
        comment.company = companyId;
        comment.user = userId;
        request.post(`/api/companies/${companyId}/comments`)
            .send(comment)
            .end((err, res) => {
                if(err){
                    return console.log(err);
                }

                if(res.body.status == 0){

                    this.setState({
                        comments: this.state.comments.concat([res.body.data]),
                        commentDialogOpen: false
                    });
                }else{
                    console.log(res.body.message);
                }
            });

    }
    loadMoreComment(){
        var {companyId, commentsCount} = this.props;
        if(this.state.comments.length >= commentsCount){
            return;
        }
        var page = Math.floor(this.state.comments.length/COMMENT_SIZE) + 1;
        request.get(`/api/companies/${companyId}/comments?page_size=${COMMENT_SIZE}&page=${page}`)
            .end((err, res) => {
                if(err){
                    return console.log(err);
                }

                if(res.body.status == 0){
                    this.setState({
                        comments: this.state.comments.concat(res.body.data)
                    });
                }else{
                    console.log(res.body.message);
                }
            });
    }
    hideCommentAdd(){
        this.setState({
            commentDialogOpen: false
        });
    }
    render(){
        var {commentsCount} = this.props;

        var comments = this.state.comments;
        comments = comments.map((comment) => {
            let content = comment.content || '';
            content = content.split(/\n/).map((item, index) => {
                return <p key={index}>{item}</p>
            });
            return (
                <div className="comment-item" key={comment._id}>
                    <div className="avatar-box inline">
                        <img src={'/' + comment.user.avatar} alt="" className="avatar"/>
                    </div>
                    <div className="body inline">
                        <div className="name-and-date">
                            <div className="name inline-b">{comment.user.name}</div>
                            <div className="date inline-b">{moment(comment.creat_date).format('YYYY-MM-DD')}</div>
                        </div>
                        <Star score={comment.score}></Star>
                        <div className="content">{content}</div>
                    </div>
                </div>
            );
        })
        return (
            <div className="comment-list w-1000 s-center show-section">
                <div className="section-title cleanfix">
                    <div className="title">客户评价</div>
                    <div className="action">
                        <i className="add-icon"></i>
                        <span onClick={this.showCommentAdd.bind(this)}>我要点评</span>
                        <CommentAdd isOpen={this.state.commentDialogOpen} onDataSubmit={this.createComment.bind(this)} onClosed={this.hideCommentAdd.bind(this)}></CommentAdd>
                    </div>
                </div>

                <div className="comment-container">
                    {comments}
                </div>
                <button className={classNames("btn-load-more", {'show': commentsCount > comments.length})} onClick={this.loadMoreComment.bind(this)}>查看更多</button>
            </div>
        );
    }
}

$(function(){

    $("#loginButton").click(function(e){
        Login($("#loginDialog"));
    })

    $("#enshrine").click(function(e){
        var self = $(this);
        var isEnshrine = JSON.parse($(this).attr('enshrine'));
        var companyId = $(this).attr("company_id");
        if(isEnshrine){
            unEnshrines(companyId, function(){
                self.html('收藏此服务商');
                self.attr('enshrine', 'false')
            });
        }else{
            enshrines(companyId, function(){
                self.html('取消收藏');
                self.attr('enshrine', 'true')
            })
        }
    })

    window.addEventListener('openLoginDialog', function(){
        console.log("test");
    });


    var caseContainer = document.getElementById('caseContainer');
    if(caseContainer){
        var casesData = JSON.parse($("#caseContainer").attr("data-cases"));
        var casesCount = JSON.parse($("#caseContainer").attr("data-count"));
        var companyId = $("#caseContainer").attr("data-company-id");


        ReactDom.render(
            <CaseContainer cases={casesData} casesCount={casesCount} companyId={companyId}></CaseContainer>
            ,
            caseContainer
        );
    }


    var quotationContainer = document.getElementById('quotationContainer');
    if(quotationContainer){
        var quotations = JSON.parse($("#quotationContainer").attr("data-quotations"));
        var quotationsCount = parseInt($("#quotationContainer").attr("data-count"));
        var companyId = $("#quotationContainer").attr("data-company-id");
        ReactDom.render(
            <QuotationContainer quotations={quotations} quotationsCount={quotationsCount} companyId={companyId}></QuotationContainer>
            ,
            quotationContainer
        );
    }


    var commentContainer = document.getElementById('commentContainer');
    var comments = JSON.parse($("#commentContainer").attr("data-comments"));
    var commentsCount = parseInt($("#commentContainer").attr("data-count"));
    var companyId = $("#commentContainer").attr("data-company-id");
    var userId = $("#commentContainer").attr("data-user-id");
    ReactDom.render(
        <CommentContainer comments={comments} commentsCount={commentsCount} companyId={companyId} userId={userId}></CommentContainer>
        ,
        commentContainer
    );

});