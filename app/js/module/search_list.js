import React from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import Footer from '../components/footer';
import SearchBar from '../components/search';
import Publish from '../components/publish';
import classNames from 'classnames';
import {cityObjArray, service_types, pageSize} from '../global_data';

import {Pagination} from '../components/pagination';

import Header from '../components/header';
import request from 'superagent';
import _ from 'lodash';

class CompaniesFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectFilter: _.find(this.props.filters, (item) => {return item.value == this.props.value}) || {value: '', label: '不限'}
        }
    }
    filter(item){
        var {onFilter} = this.props;
        this.setState({
            selectFilter: item
        });
        if(onFilter){
            onFilter(item);
        }
    }
    render() {
        var {filters} = this.props;
        if(filters[0].label != '不限'){
            filters = [{value: '', label: '不限'}].concat(filters);
        }
        filters = filters.map((filter, index) => {
            return (
                <a className={classNames('filter-item', {active: this.state.selectFilter.value == filter.value})} key={index} onClick={this.filter.bind(this, filter)}>{filter.label}</a>
            );
        });
        return (
            <div className="filter-container">
                {filters}
            </div>
        );
    }
}


class Company extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isEnshrined: false,
            caseNum: 0
        }
    }

    componentDidMount(){
        var {company, currentUser} = this.props;
        if(currentUser){
            this.isEnshrined(company);
        }
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
    isEnshrined(company){
        request.get(`/api/client/enshrines/${company._id}/is_enshrined`).end((err, res) => {
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

    beforeEnshrined(company){
        var {currentUser, openLoginPage} = this.props;
        if(!currentUser) return openLoginPage();
        if(this.state.isEnshrined){
            this.cancelEnshrined(company);
        }else{
            this.enshrined(company);
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

    showCompany(company){
        location.href = `/companies/${company._id}`;
    }
    render(){
        var {company} = this.props;

        var services = company.services_type.map((item, index) => {
            return (
                <span key={index}>{item}</span>
            );
        });

        var description = company._description || '';
        description = description.split(/\n/).map((item, index) => {
            return <p key={index}>{item}</p>
        });
        return (
            <div className={classNames('companies-item')}>
                <div className="company-name">
                    <div className="name inline" onClick={this.showCompany.bind(this, company)}>{company.name}</div>
                    <div className={classNames("inline", {'collect': !this.state.isEnshrined, 'collected': this.state.isEnshrined})} onClick={this.beforeEnshrined.bind(this, company)}></div>

                </div>
                <div className="company-body ">
                    <div className="info left-side inline">
                        <div className="company-description">
                            {description || '介绍无'}
                        </div>
                        <div className="service-row">
                            <div className="item-title inline">服务项目：</div>
                            <div className="item-container inline">

                                {services}
                            </div>
                        </div>
                        <div className="concat-and-case-row">
                            <div className="concat-container inline">
                                <div className="inline">联系方式：</div>
                                <div className="inline inline-value">{company.phone_number || company.tel}</div>
                            </div>
                            <div className="case-container inline">
                                <div className="inline">成功案例：</div>
                                <div className="inline inline-value cases-num">{this.state.caseNum}</div>
                            </div>
                        </div>
                    </div>
                    <div className="right-side action inline">
                        <button className="g-btn-primary" onClick={this.showCompany.bind(this, company)}>查看更多详情</button>
                    </div>
                </div>

            </div>
        );
    }
}


class SearchList extends React.Component{
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        var {initData, dispatch} = this.props;
        dispatch({
            type: 'INIT_AUTH',
            currentUser: initData.currentUser
        });
        dispatch({
            type: 'INIT_COMPANY_LIST_DATA',
            companies: initData.companies,
            count: initData.count,
            query: initData.query
        });
    }

    componentWillReceiveProps(nextProps){
        var {currentUser} = nextProps;
        if(currentUser){
            this.forceUpdate();
        }


    }

    searchCompany(q){
        location.href = `/search?q=${q}`;
    }


    object2url(query){
        var queryStr = '/search?';
        for(var i in query){
            queryStr = `${queryStr}${i}=${query[i]}&`;
        }
        return queryStr = queryStr.replace(/&$/, '');
    }
    onServiceFilter(val){
        var {query} = this.props;
        if(val == '不限' || val == ''){
            delete query.service_type;
        }else{
            query.service_type = val.value;
        }

        location.href = this.object2url(query);

    }

    loadPage(page){
        var {query} = this.props;
        query.page = page;
        query.page_size = 10;
        location.href = this.object2url(query);
    }

    onCityFilter(val){
        var {query} = this.props;
        if(val == '不限' || val == ''){
            delete query.city;
        }else{
            query.city = val.value;
        }
        location.href = this.object2url(query);
    }

    openLoginPage(){
        var {dispatch} = this.props;
        dispatch({
            type: 'OPEN_LOGIN_DIALOG'
        });
    }

    render(){
        //initData={currentUser,queryText}
        var {companies, count, initData, currentUser} = this.props;
        currentUser = currentUser || initData.currentUser;
        companies = companies.map((item, index) => {
            return (
                <Company company={item} key={index} currentUser={currentUser} openLoginPage={this.openLoginPage.bind(this)}></Company>
            );
        })

        var pageNum = Math.ceil(count/pageSize);
        var city = initData.query.city || '';
        var service = initData.query.service_type || '';
        var page = initData.query.page || 1;
        var initialSelected = page - 1;

        return (
            <div className="container">
                <Header></Header>
                <div className="search-container">
                    <div className="search-bar w-1000 s-center">
                        <div className="search-and-tool">
                            <SearchBar config={{no_city: true}} queryText={initData.query.q}></SearchBar>
                            <span className="text-split">或者</span>
                            <Publish></Publish>
                        </div>
                        <div className="filter-group citys">
                            <div className="filter-title inline">服务城市：</div>
                            <CompaniesFilter filters={cityObjArray} onFilter={this.onCityFilter.bind(this)} value={city}></CompaniesFilter>
                        </div>
                        <div className="filter-group types">
                            <div className="filter-title inline">服务类型：</div>
                            <CompaniesFilter filters={service_types} onFilter={this.onServiceFilter.bind(this)} value={service}></CompaniesFilter>
                        </div>
                    </div>
                </div>

                <div className="list-container w-1000 s-center mb-70">
                    <div className="search-result-num">全部结果（{count}）</div>
                    <div className="companies-list">
                        {companies}
                    </div>
                    <Pagination pageNum={pageNum} className="company-pagination" clickCallback={this.loadPage.bind(this)} initialSelected={initialSelected}></Pagination>

                </div>

                <Footer></Footer>

            </div>
        );
    }
}


function headerState({list, authService}) {
    return {
        companies: list.companies,
        count: list.count,
        query: list.query,
        currentUser: authService.currentUser
    };
}

export default connect(headerState)(SearchList);

