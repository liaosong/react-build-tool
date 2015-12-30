import React from 'react';
import { connect } from 'react-redux';

import Header from '../components/header';
import Search from '../components/search';
import Footer from '../components/footer';
import {initHomeData} from '../actions/index_actions';
import Modal from 'react-modal';
import classNames from 'classnames';


class HotSearch extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var hotWords = ['设计搭建', '公关策划', '摄影摄像', 'AV租赁', '物流仓储', '礼仪模特', '植物鲜花', '成都'];
        var mapedWords = hotWords.map((word) => {
            return (
                <a className={classNames("hot-word")} key={word}>{word}</a>
            );
        });
        return (
            <div className="hot-word-group inline">
                {mapedWords}
            </div>
        );
    }
}

class CompanyList extends React.Component {
    constructor(props) {
        super(props);


    }

    renderFullCompanyList() {
        var {companies} = this.props;
        companies = companies || [];
        companies = companies.map((company) => {
            return (
                <div className="company-item" key={company._id}>
                    <img className="company-img" src={company.company_img}/>

                    <div className="company-info">
                        <div className="company-name">{company.name}</div>
                        <div className="company-tags">{company.services_type.join(' ')}</div>
                        <div className="company-cases">成功案例：<span
                            className="cases-num">{company.cases_num}</span></div>
                    </div>
                </div>
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
                <div className="company-item" key={company._id}>
                    <img className="company-img" src={company.company_img}/>

                    <div className="company-info">
                        <div className="company-name">{company.name}</div>
                        <div className="company-cases">搭建案例展示：
                            <span className="cases-num">{company.cases_num}</span></div>
                    </div>
                </div>
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
                <div className="company-item" key={company._id}>
                    <img className="company-img" src={company.company_img}/>

                    <div className="company-info">
                        <div className="company-name">{company.name}</div>
                        <div className="company-cases">{company.services.join(' ')}</div>
                    </div>
                </div>
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
        var {currentUser, dispatch} = this.props;
        if(currentUser){
            dispatch({
                type: 'INIT_AUTH',
                currentUser: currentUser
            });
        }

        this.state = {
            tenderDialogOpen: false
        }
    }


    componentDidMount(){
        var {dispatch} = this.props;
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
    render() {
        var {fullCompany, factoryCompany, rentCompany} = this.props;
        var dialogStyle = {
            content:{
                width: '600px',
                height: '360px',
                top: "calc(50% - 180px)",
                left: "calc(50% - 300px)",
                border: 'none'
            },
            overlay:{
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
        return (
            <div className="container">
                <header className="cleanfix">
                    <Header></Header>

                    <h1 className="title-welcome">欢迎光临</h1>

                    <p className="site-title">向超过190个国家的参展商提供优质的会展服务</p>

                    <div className="header-bottom">
                        <div className="w-1000 s-center">
                            <div className="search-and-tool">
                                <Search className="inline"></Search>
                                <span className="text-split">或者</span>

                                <div className="publish" id="publish">
                                    <button onClick={this.onCreateTender.bind(this)}>发布需求</button>
                                    <Modal isOpen={this.state.tenderDialogOpen} style={dialogStyle} className="tender-type-container">
                                        <div className="head">请选择需求类型</div>
                                        <div className="type-container">
                                            <div className="inline-b meeting" onClick={this.getTenderPage.bind(this, 'meeting')}>
                                                <div className="type-img"></div>
                                                <div className="type-name">发布会议</div>
                                            </div>
                                            <div className="inline-b exhibition" onClick={this.getTenderPage.bind(this, 'exhibition')}>
                                                <div className="type-img"></div>
                                                <div className="type-name">发布展览</div></div>
                                        </div>
                                        <div className="close" onClick={this.closeDialog.bind(this)}></div>
                                    </Modal>
                                </div>
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
                        <button className="load-more">加载更多</button>
                    </section>
                    <section className="type-factory">
                        <h2 className="section-head text-center">展厅展台搭建</h2>

                        <p className="section-title text-center">会展、展柜、展厅、舞台搭建工程</p>
                        <CompanyList type={"factory"} companies={factoryCompany}></CompanyList>
                        <button className="load-more">加载更多</button>
                    </section>
                    <section className="type-hire">
                        <h2 className="section-head text-center">设备租赁</h2>

                        <p className="section-title text-center">灯光、音响、视频设备租赁</p>
                        <CompanyList type={"hire"} companies={rentCompany}></CompanyList>
                        <button className="load-more">加载更多</button>
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
        fullCompany: index.homeData.fullCompany,
        factoryCompany: index.homeData.factoryCompany,
        rentCompany: index.homeData.rentCompany,
        currentUser: authService.currentUser
    };
}

export default connect(headerState)(Index);