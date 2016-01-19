import React from 'react';
import classNames from 'classnames';

import request from 'superagent';

import {pageSize} from '../global_data';

class CitySelecter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [
        '不限','北京','上海','广州','深圳','天津','杭州','南京','武汉','重庆','成都','西安'
      ],
      isOpen: false,
      selectCity: '不限'
    };
    this.value = this.state.selectCity;
  }
  hide(){
    this.setState({
      isOpen: false
    });
  }

  show(){
    this.setState({
      isOpen: true
    });
  }
  toggle(evt){
    if(this.state.isOpen){
      this.hide();
    }else{
      this.show();
    }
    evt.stopPropagation();
  }
  setSelect(city){
    this.value = city;
    this.setState({
      selectCity: city
    });
  }
  windowClickHander(evt){
    if(this.state.isOpen){
      this.hide();
      evt.stopPropagation();
    }
  }
  componentWillUnmount(){
    window.removeEventListener('click', this.windowClickHander);
  }
  componentDidMount(){
    window.addEventListener('click', this.windowClickHander.bind(this));
  }
  render() {
    var cities = this.state.cities.map((city) => {
      var className;
      if(this.state.selectCity === city){
        className = classNames('selected');
      }
      return (
          <li key={city} className={className} onClick={this.setSelect.bind(this, city)}>{city}</li>
      );
    });



    return (
      <div className={classNames('city-selecter', 'inline')} onClick={this.toggle.bind(this)}>
        <span>{this.state.selectCity}</span>
        <ul className={classNames('city-container','cleanfix', {
        show: this.state.isOpen
        })}>
          {cities}
        </ul>
        <div className="arrow"></div>
      </div>
    );
  }
}



class SearchBar extends React.Component {
  constructor(props) {
    super(props);
  }

  searchCompany(q, city, cb){
    request.get(`/api/search?query_text=${q}&page_size=${pageSize}`).end((err, res) => {
      if(err) return console.log(err);
      if(res.body.status == 0){
        cb(q, res.body);
      }
    })
  }
  search(){
    var {keywords, city} = this.refs;
    var {onSearched} = this.props;
    var cityVal;
    city = city || {};
    if(city.value){
      cityVal = city.value == '不限' ? '' : city.value;
    }else{
      cityVal = '';
    }
    if(!onSearched){
      return location.href = encodeURI(`/search?q=${keywords.value}&city=${cityVal}`);
    }
    this.searchCompany(keywords.value, city, onSearched);

  }
  renderNoCity(){
    return (
      <div className={classNames('inline')}>
        <input className={classNames('search-input')} ref="keywords" defaultValue={this.props.queryText || ''} placeholder="您需要什么服务?"/>
        <button className={classNames('search-button')} onClick={this.search.bind(this)}>搜索</button>
      </div>
    );
  }
  render() {
    var noCity = (this.props.config && this.props.config.no_city) || false;

    if(noCity) return this.renderNoCity();
    return (
      <div className={classNames('inline')} >
        <input className={classNames('search-input')} ref="keywords" defaultValue={this.props.queryText || ''} placeholder="您需要什么服务?"/>
        <CitySelecter ref="city"/>
        <button className={classNames('search-button')} onClick={this.search.bind(this)}>搜索</button>
      </div>
    );
  }
}

export default SearchBar;
