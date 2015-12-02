import React from 'react';
import { connect } from 'react-redux';

import Header from '../components/header';
import Search from '../components/search';
import Footer from '../components/footer';

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
        // var companies =
        return (
            <div className={classNames("company-list","cleanfix")}>
                <div className={classNames("company-item")}>
                    <img className={classNames("company-img")}/>

                    <div className={classNames("company-info")}>
                        <div className={classNames("company-name")}>成都汀兰商务会议有限公司</div>
                        <div className={classNames("company-tags")}>礼品定制 演员节目 场地搭建</div>
                        <div className={classNames("company-cases")}>成功案例：<span
                            className={classNames("cases-num")}>67</span></div>
                    </div>
                </div>
                <div className={classNames("company-item")}>
                    <img className={classNames("company-img")}/>

                    <div className={classNames("company-info")}>
                        <div className={classNames("company-name")}>成都汀兰商务会议有限公司</div>
                        <div className={classNames("company-tags")}>礼品定制 演员节目 场地搭建</div>
                        <div className={classNames("company-cases")}>成功案例：<span
                            className={classNames("cases-num")}>67</span></div>
                    </div>
                </div>
                <div className={classNames("company-item")}>
                    <img className={classNames("company-img")}/>

                    <div className={classNames("company-info")}>
                        <div className={classNames("company-name")}>成都汀兰商务会议有限公司</div>
                        <div className={classNames("company-tags")}>礼品定制 演员节目 场地搭建</div>
                        <div className={classNames("company-cases")}>成功案例：<span
                            className={classNames("cases-num")}>67</span></div>
                    </div>
                </div>
                <div className={classNames("company-item")}>
                    <img className={classNames("company-img")}/>

                    <div className={classNames("company-info")}>
                        <div className={classNames("company-name")}>成都汀兰商务会议有限公司</div>
                        <div className={classNames("company-tags")}>礼品定制 演员节目 场地搭建</div>
                        <div className={classNames("company-cases")}>成功案例：<span
                            className={classNames("cases-num")}>67</span></div>
                    </div>
                </div>
            </div>
        );
    }

    renderFactoryList() {
        return (
            <div className={classNames("factory-list")}>
                <div className={classNames('factory-item')}>
                    <img className={classNames('factory-img')}/>

                    <div className={classNames('factory-info')}>
                        <div className={classNames('factory-name')}></div>
                        <div className={classNames('factory-cases')}>搭建案例展示：<span
                            className={classNames("cases-num")}>67</span></div>
                    </div>
                </div>
            </div>
        );
    }

    renderHireList() {
        return (
            <div className={classNames("hire-list")}>

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
    }
    render() {
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
                                    <button>发布需求</button>
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
                        <CompanyList type={"full_company"}></CompanyList>
                        <button className="load-more">加载更多</button>
                    </section>
                    <section className="type-factory">
                        <h2 className="section-head text-center">展厅展台搭建</h2>

                        <p className="section-title text-center">会展、展柜、展厅、舞台搭建工程</p>
                        <CompanyList type={"factory"}></CompanyList>
                        <button className="load-more">加载更多</button>
                    </section>
                    <section className="type-hire">
                        <h2 className="section-head text-center">设备租赁</h2>

                        <p className="section-title text-center">灯光、音响、视频设备租赁</p>
                        <CompanyList type={"hire"}></CompanyList>
                        <button className="load-more">加载更多</button>
                    </section>
                </div>
                <Footer></Footer>

            </div>
        );
    }

;

}

function headerState(state) {
    return {
        dialogClose: true
    }
}

export default connect(headerState)(Index);