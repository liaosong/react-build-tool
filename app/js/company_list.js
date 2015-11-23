import React from 'react';
import ReactDom from 'react-dom';
import Footer from './components/footer';
import SearchBar from './components/search';
import classNames from 'classnames';
import ReactPaginate from 'react-paginate';

//var ReactPaginate = require('react-paginate');
var searchBarConf = {
  no_city: true
};


class CompaniesFilter extends React.Component {
  constructor(props) {
    super(props);
  }
  filter(){
    console.log(arguments);
  }
  render() {
    var filters = ['不限','北京','上海','广州'];
    filters = filters.map((filter) => {
      return (
        <a className={classNames('filter-item')} key={filter} onClick={this.filter.bind(this)}>{filter}</a>
      );
    });
    return (
      <div className={classNames('filter-container')}>
        {filters}
      </div>
    );
  }
}

class Company extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className={classNames('companies-item')}>
        <div className="company-name">成都普锐斯会展服务公司aaa</div>
        <div className="company-body">
          <div className="company-description">
            普锐斯专注于做会啊很杂发送到发送到
          </div>
          <div className="service-row">
            <div className="item-title inline">服务项目：</div>
            <div className="item-container inline">
              <span>舞台搭建</span>
              <span>舞台搭建</span>
              <span>舞台搭建</span>
            </div>
          </div>
          <div className="concat-and-case-row">
            <div className="concat-container inline">
              <div className="inline">联系方式：</div>
              <div className="inline inline-value">18782972908</div>
            </div>
            <div className="case-container inline">
              <div className="inline">成功案例：</div>
              <div className="inline inline-value cases-num">19</div>
            </div>
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

  render(){
    return (
      <div className={classNames('companies-list')}>
        <Company />
      </div>
    );
  }
}





ReactDom.render(<SearchBar config={searchBarConf}/>, document.getElementById('search_bar'));
ReactDom.render(<CompaniesFilter/>, document.getElementById('city_filter'));
ReactDom.render(<CompaniesFilter/>, document.getElementById('type_filter'));
ReactDom.render(<SearchList />, document.getElementById('search_list'));
//ReactDom.render(<ReactPaginate total={450}/>, document.getElementById('pagination'));
ReactDom.render(<Footer/>, document.getElementById('footer'));