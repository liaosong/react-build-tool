import React from 'react';
import { connect } from 'react-redux';

import Header from '../components/header';
import Search from '../components/search';
import Footer from '../components/footer';
import {initHomeData} from '../actions/index_actions';
import Publish from '../components/publish';
import classNames from 'classnames';
import request from 'superagent';


class HotSearch extends React.Component {
    constructor(props) {
        super(props);
    }

    onSearch(word){
        location.href = `/search?q=${word}`;
    }

    render() {
        var hotWords = ['设计搭建', '公关策划', '摄影摄像', 'AV租赁', '物流仓储', '礼仪模特', '植物鲜花', '成都'];
        var mapedWords = hotWords.map((word, index) => {
            return (
                <a className={classNames("hot-word")} key={index} onClick={this.onSearch.bind(this, word)}>{word}</a>
            );
        });
        return (
            <div className="hot-word-group inline">
                {mapedWords}
            </div>
        );
    }
}


class HireCompany extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            quotations: []
        }
    }

    componentDidMount(){
        this.getQuotation();
    }
    getQuotation(){
        var {company} = this.props;
        request.get(`/api/companies/${company._id}/quotations`)
            .end((err, res) => {
                if(err) return console.log(err);

                if(res.body.status == 0){
                    this.setState({
                        quotations: res.body.data
                    });
                }else{
                    console.log(res.body.message);
                }
            });
    }
    showCompany(company){
        location.href = `/companies/${company._id}`;
    }

    render(){
        var {company} = this.props;
        var quotations = this.state.quotations.map((item) => {
            return item.name
        })
        return (
            <div className="company-item">
                <img className="company-img" src={company.web_ad_img} onClick={this.showCompany.bind(this, company)}/>

                <div className="company-info">
                    <div className="company-name" onClick={this.showCompany.bind(this, company)}>{company.name}</div>
                    <div className="company-cases">{quotations.join(' ')}</div>
                </div>
            </div>
        );
    }
}

class FullCompany extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            caseNum: 0
        }
    }

    showCompany(company){
        location.href = `/companies/${company._id}`;
    }

    componentDidMount(){
        var {company} = this.props;
        this.getCaseNum(company);

    }
    getCaseNum(company){
        request.get(`/api/companies/${company._id}/case_num`).end((err, res) => {
            if(err){
                return console.log(err);
            }

            if(res.body.status == 0){
                this.setState({
                    caseNum: res.body.data
                });
            }else{
                console.log(res.body.message);
            }
        })
    }


    render(){
        var {company} = this.props;
        return (
            <div className="company-item">
                <img className="company-img" src={company.web_ad_img} onClick={this.showCompany.bind(this, company)}/>

                <div className="company-info">
                    <div className="company-name" onClick={this.showCompany.bind(this, company)}>{company.name}</div>
                    <div className="company-tags">{company.services_type.join(' ')}</div>
                    <div className="company-cases">成功案例：<span
                        className="cases-num">{this.state.caseNum}</span></div>
                </div>
            </div>
        );
    }
}


class FactoryCompany extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            caseNum: 0
        }
    }

    showCompany(company){
        location.href = `/companies/${company._id}`;
    }

    componentDidMount(){
        var {company} = this.props;
        this.getCaseNum(company);

    }
    getCaseNum(company){
        request.get(`/api/companies/${company._id}/case_num`).end((err, res) => {
            if(err){
                return console.log(err);
            }

            if(res.body.status == 0){
                this.setState({
                    caseNum: res.body.data
                });
            }else{
                console.log(res.body.message);
            }
        })
    }

    render() {
        var {company} = this.props;
        return (
            <div className="company-item">
                <img className="company-img" src={company.web_ad_img} onClick={this.showCompany.bind(this, company)}/>

                <div className="company-info">
                    <div className="company-name" onClick={this.showCompany.bind(this, company)}>{company.name}</div>
                    <div className="company-cases">搭建案例展示：
                        <span className="cases-num">{this.state.caseNum}</span></div>
                </div>
            </div>
        );
    }

}


class CompanyList extends React.Component {
    constructor(props) {
        super(props);
    }

    showCompany(company){
        location.href = `/companies/${company._id}`;
    }

    renderFullCompanyList() {
        var {companies} = this.props;
        companies = companies || [];
        companies = companies.map((company) => {
            return (
                <FullCompany company={company} key={company._id}></FullCompany>
            );
        });
        return (
            <div className={classNames("company-list","cleanfix")}>
                {companies}
            </div>
        );
    }

    renderFactoryList() {
        var {companies} = this.props;
        companies = companies || [];
        companies = companies.map((company) => {
            return (
                <FactoryCompany company={company} key={company._id}></FactoryCompany>
            );
        });
        return (
            <div className="row-list factory-list">
                {companies}
            </div>
        );
    }

    renderHireList() {

        var {companies} = this.props;
        companies = companies || [];
        companies = companies.map((company) => {
            return (
                <HireCompany company={company} key={company._id}></HireCompany>
            );
        });
        return (
            <div className="row-list hire-list">
                {companies}
            </div>
        );
    }

    render() {
        var companyType = this.props.type || 'error';

        switch (companyType) {
            case 'full_company':
                return this.renderFullCompanyList();
                break;
            case 'factory':
                return this.renderFactoryList();
                break;
            case 'hire':
                return this.renderHireList();
                break;
            default:
                throw Error('CompanyList type error');
        }

    }
}

class Index extends React.Component {
    constructor(props){
        super(props);


        this.state = {
            tenderDialogOpen: false
        }
    }


    componentDidMount(){
        var {initUser, dispatch} = this.props;
        if(initUser){
            dispatch({
                type: 'INIT_AUTH',
                currentUser: initUser
            });
        }
        dispatch(initHomeData());
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

    loadFullCompany(){
        location.href = `/search?service_type=full`;
    }
    loadFactorCompany(){
        location.href = `/search?service_type=场地搭建`;
    }
    loadHireCompany(){
        location.href = `/search?service_type=设备租赁`;
    }
    render() {
        var {fullCompany, factoryCompany, rentCompany} = this.props;
        return (
            <div className="container">
                <header className="cleanfix">
                    <Header></Header>

                    <h1 className="title-welcome">系统公测中</h1>

                    <p className="site-title">欢迎使用神州会展！元月1日至31日系统公测中，2月1日正式上线，敬请期待！！！</p>

                    <div className="header-bottom">
                        <div className="w-1000 s-center">
                            <div className="search-and-tool">
                                <Search className="inline"></Search>
                                <span className="text-split">或者</span>

                                <Publish></Publish>
                            </div>
                            <div className="hot-word-tool">
                                <div className="tool-title inline">热门搜索：</div>
                                <HotSearch></HotSearch>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="companies w-1000 s-center">
                    <section className="type-full">
                        <h2 className="section-head text-center">会展服务商</h2>

                        <p className="section-title text-center">为您提供一站式会议展览活动的策划设计及搭建执行服务</p>
                        <CompanyList type={"full_company"} companies={fullCompany}></CompanyList>
                        <button className="load-more" onClick={this.loadFullCompany.bind(this)}>查看更多</button>
                    </section>
                    <section className="type-factory">
                        <h2 className="section-head text-center">展厅展台搭建</h2>

                        <p className="section-title text-center">会展、展柜、展厅、舞台搭建工程</p>
                        <CompanyList type={"factory"} companies={factoryCompany}></CompanyList>
                        <button className="load-more" onClick={this.loadFactorCompany.bind(this)}>查看更多</button>
                    </section>
                    <section className="type-hire">
                        <h2 className="section-head text-center">设备租赁</h2>

                        <p className="section-title text-center">灯光、音响、视频设备租赁</p>
                        <CompanyList type={"hire"} companies={rentCompany}></CompanyList>
                        <button className="load-more" onClick={this.loadHireCompany.bind(this)}>查看更多</button>
                    </section>
                </div>
                <Footer></Footer>

            </div>
        );
    }

;

}

function headerState({index, authService}) {
    return {
        fullCompany: index.homeData.fullCompany || [],
        factoryCompany: index.homeData.factoryCompany || [],
        rentCompany: index.homeData.rentCompany || [],
        currentUser: authService.currentUser
    };
}

export default connect(headerState)(Index);