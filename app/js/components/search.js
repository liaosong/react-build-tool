import React from 'react';
import classNames from 'classnames';
import $ from 'jquery';

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
  search(){
    $.get('/api/companies').then(function(data){console.log(data)});
  }
  renderNoCity(){
    return (
      <div className={classNames('inline')}>
        <input className={classNames('search-input')}/>
        <button className={classNames('search-button')}>搜索</button>
      </div>
    );
  }
  render() {
    var noCity = (this.props.config && this.props.config.no_city) || false;

    if(noCity) return this.renderNoCity();
    return (
      <div className={classNames('inline')} >
        <input className={classNames('search-input')}/>
        <CitySelecter/>
        <button className={classNames('search-button')} onClick={this.search.bind(this)}>搜索</button>
      </div>
    );
  }
}

export default SearchBar;
