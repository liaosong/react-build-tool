import React from 'react';
import ReactDom from 'react-dom';
import Footer from './components/footer';
import SearchBar from './components/search';
import classNames from 'classnames';


class HotSearch extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var hotWords = ['设计搭建', '公关策划', '摄影摄像', 'AV租赁', '物流仓储', '礼仪模特', '植物鲜花'];
    var mapedWords = hotWords.map((word) => {
      return (
        <a className={classNames("hot-word")} key={word}>{word}</a>
      );
    });
    return (
      <div className={classNames("hot-word-group")}>
      {mapedWords}
      </div>
    );
  }
}


class CompanyList extends React.Component {
  constructor(props) {
    super(props);
  }
  renderFullCompanyList(){
    // var companies =
    return (
      <div className={classNames("company-list","cleanfix")}>
        <div className={classNames("company-item")}>
          <img className={classNames("company-img")} />
          <div className={classNames("company-info")}>
            <div className={classNames("company-name")}>成都汀兰商务会议有限公司</div>
            <div className={classNames("company-tags")}>礼品定制 演员节目 场地搭建</div>
            <div className={classNames("company-cases")}>成功案例：<span className={classNames("cases-num")}>67</span></div>
          </div>
        </div>
        <div className={classNames("company-item")}>
          <img className={classNames("company-img")} />
          <div className={classNames("company-info")}>
            <div className={classNames("company-name")}>成都汀兰商务会议有限公司</div>
            <div className={classNames("company-tags")}>礼品定制 演员节目 场地搭建</div>
            <div className={classNames("company-cases")}>成功案例：<span className={classNames("cases-num")}>67</span></div>
          </div>
        </div>
        <div className={classNames("company-item")}>
          <img className={classNames("company-img")} />
          <div className={classNames("company-info")}>
            <div className={classNames("company-name")}>成都汀兰商务会议有限公司</div>
            <div className={classNames("company-tags")}>礼品定制 演员节目 场地搭建</div>
            <div className={classNames("company-cases")}>成功案例：<span className={classNames("cases-num")}>67</span></div>
          </div>
        </div>
        <div className={classNames("company-item")}>
          <img className={classNames("company-img")} />
          <div className={classNames("company-info")}>
            <div className={classNames("company-name")}>成都汀兰商务会议有限公司</div>
            <div className={classNames("company-tags")}>礼品定制 演员节目 场地搭建</div>
            <div className={classNames("company-cases")}>成功案例：<span className={classNames("cases-num")}>67</span></div>
          </div>
        </div>
      </div>
    );
  }

  renderFactoryList(){
    return (
      <div className={classNames("factory-list")}>
        <div className={classNames('factory-item')}>
          <img className={classNames('factory-img')}/>
          <div className={classNames('factory-info')}>
            <div className={classNames('factory-name')}></div>
            <div className={classNames('factory-cases')}>搭建案例展示：<span className={classNames("cases-num")}>67</span></div>
          </div>
        </div>
      </div>
    );
  }

  renderHireList(){
    return (
      <div className={classNames("hire-list")}>

      </div>
    );
  }

  render() {
    var companyType = this.props.type || 'error';

    switch(companyType){
      case 'full_company': return this.renderFullCompanyList(); break;
      case 'factory': return this.renderFactoryList(); break;
      case 'hire': return this.renderHireList(); break;
      default: throw Error('CompanyList type error');
    }

  }
}




ReactDom.render(<HotSearch/>, document.getElementById('hot_words'));
ReactDom.render(<SearchBar/>, document.getElementById('search_bar'));
ReactDom.render(<CompanyList type={"full_company"}/>, document.getElementById('full_type_list'));
ReactDom.render(<CompanyList type={"factory"}/>, document.getElementById('factory_list'));
ReactDom.render(<CompanyList type={"hire"}/>, document.getElementById('hire_list'));
ReactDom.render(<Footer/>, document.getElementById('footer'));

