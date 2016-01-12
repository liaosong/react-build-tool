import React from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import Footer from '../components/footer';
import SearchBar from '../components/search';
import Publish from '../components/publish';
import classNames from 'classnames';
import {cities, service_types, pageSize} from '../global_data';

import {Pagination} from '../components/pagination';

import Header from '../components/header';
import request from 'superagent';

class CompaniesFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectFilter: this.props.value || '不限'
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
        if(filters[0] != '不限'){
            filters = ['不限'].concat(filters);
        }
        filters = filters.map((filter, index) => {
            return (
                <a className={classNames('filter-item', {active: this.state.selectFilter == filter})} key={index} onClick={this.filter.bind(this, filter)}>{filter}</a>
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
    }

    showCompany(company){
        location.href = `/companies/${company._id}`;
    }
    render(){
        var {company} = this.props;

        var services = company.services.map((item, index) => {
            return (
                <span key={index}>{item}</span>
            );
        });
        return (
            <div className={classNames('companies-item')}>
                <div className="company-name">
                    <div className="name inline">{company.name}</div>
                    <div className="collect inline"></div>

                </div>
                <div className="company-body ">
                    <div className="info left-side inline">
                        <div className="company-description">
                            {company._description || '介绍无'}
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
                                <div className="inline inline-value">{company.phone_number}</div>
                            </div>
                            <div className="case-container inline">
                                <div className="inline">成功案例：</div>
                                <div className="inline inline-value cases-num">{company.cases_num}</div>
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
            query.service_type = val;
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
            query.city = val;
        }
        location.href = this.object2url(query);
    }

    render(){
        //initData={currentUser,queryText}
        var {companies, count, initData} = this.props;
        var serviceFilter = service_types.map((item) => {
            return item.value;
        });

        companies = companies.map((item, index) => {
            return (
                <Company company={item} key={index}></Company>
            );
        })

        var pageNum = Math.ceil(count/pageSize);
        var city = initData.query.city || '不限';
        var service = initData.query.service_type || '不限';
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
                            <CompaniesFilter filters={cities} onFilter={this.onCityFilter.bind(this)} value={city}></CompaniesFilter>
                        </div>
                        <div className="filter-group types">
                            <div className="filter-title inline">服务类型：</div>
                            <CompaniesFilter filters={serviceFilter} onFilter={this.onServiceFilter.bind(this)} value={service}></CompaniesFilter>
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


function headerState({list}) {
    return {
        companies: list.companies,
        count: list.count,
        query: list.query
    };
}

export default connect(headerState)(SearchList);

