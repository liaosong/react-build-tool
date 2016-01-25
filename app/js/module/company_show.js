import React from 'react';
import { connect } from 'react-redux';
import Footer from '../components/footer';
import Header from '../components/header';
import request from 'superagent';
import {Star} from '../components/star';

import CommentAdd from '../components/comment_add';
import moment from 'moment';
import {CaseShow} from './case_show';
import classNames from 'classnames';

const casePageSize = 6;
const quotationPageSize = 8;
const commentPageSize = 10;

function loadCases(company, page = 1){

    return dispatch => {
        request.get(`/api/companies/${company._id}/cases?page_size=${casePageSize}&page=${page}`)
            .end((err, res) => {
                if(err){
                    return console.log(err);
                }

                if(res.body.status == 0){
                    dispatch({
                        type: 'LOAD_MORE_CASES',
                        cases: res.body.data,
                        count: res.body.count
                    });
                }else{
                    console.log(res.body.message);
                }
            });
    }
}


function loadQuotation(company, page = 1){

    return dispatch => {
        request.get(`/api/companies/${company._id}/quotations?page_size=${quotationPageSize}&page=${page}`)
            .end((err, res) => {
                if(err){
                    return console.log(err);
                }

                if(res.body.status == 0){
                    dispatch({
                        type: 'LOAD_MORE_QUOTATIONS',
                        quotations: res.body.data,
                        quotationsCount: res.body.count
                    });
                }else{
                    console.log(res.body.message);
                }
            });
    }
}

function loadComment(company, page = 1){

    return dispatch => {
        request.get(`/api/companies/${company._id}/comments?page_size=${commentPageSize}&page=${page}`)
            .end((err, res) => {
                if(err){
                    return console.log(err);
                }

                if(res.body.status == 0){
                    dispatch({
                        type: 'LOAD_MORE_COMMENTS',
                        comments: res.body.data,
                        count: res.body.count
                    });
                }else{
                    console.log(res.body.message);
                }
            });
    }
}

function addComment(comment){

    return dispatch => {
        request.post(`/api/companies/${comment.company}/comments`)
            .send(comment)
            .end((err, res) => {
                if(err){
                    return console.log(err);
                }

                if(res.body.status == 0){
                    dispatch({
                        type: 'ADD_COMMENT',
                        comment: res.body.data
                    });
                }else{
                    console.log(res.body.message);
                }
            });
    }
}

class Case extends React.Component{

    showCase(caseInfo) {
        var showCaseHander = this.props.showCaseHander;
        if(showCaseHander){
            showCaseHander(caseInfo);
        }
    }


    render(){
        var {caseInfo} = this.props;
        var caseImg = caseInfo.img_urls.length >= 1 ? '/' + caseInfo.img_urls[0].url : '';
        return (
            <div className="case-item inline" onClick={this.showCase.bind(this, caseInfo)}>
                <img src={caseImg} alt="" className="case-img"/>
                <div className="case-title">{caseInfo.title}</div>
            </div>
        );
    }
}

class Quotation extends React.Component{

    render(){
        var {quotation} = this.props;
        var quotationImg = quotation.img_urls.length >= 1 ? '/' + quotation.img_urls[0].url : '';
        return (
            <div className="quotation-item inline">
                <img src={quotationImg} alt="" className="quotation-img"/>
                <div className="quotation-info">
                    <div className="name">{quotation.name}</div>
                    <div className="price">{quotation.price}</div>
                </div>
            </div>
        );
    }
}

class Comment extends React.Component{

    render(){
        var {comment} = this.props;

        var content = comment.content || '';
        content = content.split(/\n/).map((item, index) => {
            return <p key={index}>{item}</p>
        });
        return (
            <div className="comment-item">
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
    }
}

class CompanyShow extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            commentDialogOpen: false,
            selectCase: null,
            isEnshrined: false,
            caseShowOpen: false
        }
    }

    componentDidMount(){
        var {initData, dispatch} = this.props;
        dispatch({
            type: 'INIT_STORE',
            company: initData.company
        });

        dispatch(loadCases(initData.company));
        dispatch(loadQuotation(initData.company));
        dispatch(loadComment(initData.company));

        if(initData.currentUser){
            request.get(`/api/client/enshrines/${initData.company._id}/is_enshrined`).end((err, res) => {
                if(err){
                    return console.log(err);
                }

                if(res.body.status == 0){
                    this.setState({
                        isEnshrined: res.body.data
                    });
                }else{
                    console.log(res.body.message);
                }
            });
        }
    }
    showCommentAdd(){
        var {currentUser, dispatch} = this.props;
        if(!currentUser){
            dispatch({
                type: 'OPEN_LOGIN_DIALOG'
            });
        }else{
            this.setState({
                commentDialogOpen: true
            });
        }

    }
    hideCommentAdd(){
        this.setState({
            commentDialogOpen: false
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

    createComment(comment){
        var {currentUser, company, dispatch} = this.props;
        comment.company = company._id;
        if(currentUser){
            comment.user = currentUser._id;
        }

        dispatch(addComment(comment));
        this.setState({
            commentDialogOpen: false
        });

    }
    beforeEnshrine(comapny){
        var {currentUser, dispatch} = this.props;
        if(!currentUser){
            dispatch({
                type: 'OPEN_LOGIN_DIALOG'
            })
        }else{
            if(this.state.isEnshrined){
                this.cancelEnshrined(comapny);
            }else{
                this.enshrined(comapny);
            }

        }
    }
    cancelEnshrined(company){
        request.del(`/api/client/enshrines/cancel`)
        .send({company: company._id})
        .end((err, res) => {
            if(err){
                return console.log(err);
            }

            if(res.body.status == 0){
                this.setState({
                    isEnshrined: false
                });
            }else{
                console.log(res.body.message);
            }
        });
    }
    enshrined(company){
        request.post(`/api/client/enshrines`)
            .send({company: company._id})
            .end((err, res) => {
            if(err){
                return console.log(err);
            }

            if(res.body.status == 0){
                this.setState({
                    isEnshrined: true
                });
            }else{
                console.log(res.body.message);
            }
        });
    }

    loadMoreCase(){
        var {caseCount, cases, company, dispatch} = this.props;

        if(caseCount > cases.length){
            //加载更多
            var page = cases.length / casePageSize;
            dispatch(loadCases(company, page + 1));
        }

    }

    loadMoreService(){
        var {quotationsCount, quotations, company, dispatch} = this.props;

        if(quotationsCount > quotations.length){
            var page = quotations.length/ quotationPageSize;
            dispatch(loadQuotation(company, page + 1));
        }
    }

    loadMoreComment(){
        var {commentCount, comments, company, dispatch} = this.props;
        if(commentCount > comments.length){
            var page = comments.length / commentPageSize;
            dispatch(loadComment(company, page + 1));
        }
    }
    render(){

        var {company, cases, quotations, comments, caseCount, quotationsCount, commentCount} = this.props;
        company.services_type = company.services_type || [];

        var serviceType = company.services_type.map((item, index) => {
            return (
                <span key={index} className="item">{item}</span>
            );
        });

        var cases = cases.map((item, index) => {
            return (
                <Case key={index} caseInfo={item} showCaseHander={this.showCase.bind(this)}></Case>
            );
        });

        var quotations = quotations.map((item, index) => {
            return (
                <Quotation quotation={item} key={index}></Quotation>
            );
        });

        var comments = comments.map((item, index) => {
            return (
                <Comment comment={item} key={index}></Comment>
            );
        })

        var enshrineText = this.state.isEnshrined ? '取消收藏': '收藏此服务商';

        var description = company._description || '';
        description = description.split(/\n/).map((item, index) => {
            return <p key={index}>{item}</p>
        });
        var companyImgStyle = {
            backgroundImage: `url(/${company.web_company_img})`
        };
        return (
            <div className="container">
                <Header></Header>
                <div className="company-show-container">
                    <div className="company-home-page">
                        <div className="head-img" style={companyImgStyle}></div>
                        <div className="company-info w-1000 s-center inline-container">
                            <div className="left-side inline">
                                <div className="company-logo inline">
                                    <img src={'/' + company.company_logo} alt="" className="logo"/>
                                </div>
                                <div className="name-and-service inline">
                                    <div className="name">{company.name}</div>
                                    <div className="services">
                                        <div className="service-title inline">服务项目：</div>
                                        <div className="service-items inline">
                                            {serviceType}

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="right-side inline">
                                <div className="concat-user-info">
                                    <div className="name">{company.contacts}</div>
                                    <div className="phone-number">{company.phone_number}</div>
                                </div>
                                <hr className="line"/>
                                <p className="address">{company.address}</p>
                            </div>
                        </div>
                    </div>

                    <div className="company-about inline-container w-1000 s-center">
                        <div className="left-side inline">
                            <div className="section-title">关于此服务商</div>
                            <div className="content">
                                {description}
                            </div>
                        </div>
                        <div className="right-side inline">
                            <div className="btn-container">
                                <button onClick={this.beforeEnshrine.bind(this, company)}>{enshrineText}</button>
                            </div>
                        </div>
                    </div>

                    <section className="company-cases w-1000 s-center show-section">
                        <div className="section-title">成功案例展示</div>
                        <div className="cases-container">
                            {cases}
                        </div>
                        <button className={classNames("btn-load-more", {'show': caseCount > cases.length})} onClick={this.loadMoreCase.bind(this)}>查看更多</button>
                        <CaseShow caseInfo={this.state.selectCase} className="case-show-container" isOpen={this.state.caseShowOpen} hideCaseHander={this.hideCaseHander.bind(this)}></CaseShow>
                    </section>
                    <section className="company-services w-1000 s-center show-section">
                        <div className="section-title">产品或服务</div>
                        <div className="services-container">
                            {quotations}
                        </div>
                        <button className={classNames("btn-load-more", {'show': quotationsCount > quotations.length})} onClick={this.loadMoreService.bind(this)}>查看更多</button>
                    </section>
                    <div className="bg-fff">
                        <div className="comment-list w-1000 s-center show-section">
                            <div className="section-title">
                                <div className="title inline-b">客户评价</div>
                                <div className="action inline-b">
                                    <i className="add-icon"></i>
                                    <span onClick={this.showCommentAdd.bind(this)}>我要点评</span>
                                    <CommentAdd isOpen={this.state.commentDialogOpen} onDataSubmit={this.createComment.bind(this)} onClosed={this.hideCommentAdd.bind(this)}></CommentAdd>
                                </div>
                            </div>

                            <div className="comment-container">
                                {comments}
                            </div>
                            <button className={classNames("btn-load-more", {'show': commentCount > comments.length})} onClick={this.loadMoreComment.bind(this)}>查看更多</button>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}



function headerState({companyShow, authService}) {
    return {
        currentUser: authService.currentUser,
        company: companyShow.company,
        cases: companyShow.cases,
        quotations: companyShow.quotations,
        comments: companyShow.comments,
        caseCount: companyShow.caseCount,
        quotationsCount: companyShow.quotationsCount,
        commentCount: companyShow.commentCount
    };
}

export default connect(headerState)(CompanyShow);

