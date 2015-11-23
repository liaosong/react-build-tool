import React from 'react';
import classNames from 'classnames';

class CitySelecter extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={classNames('city-selecter', 'inline')}>
        <span>成都</span>
        <div className={classNames('city-container')}>
          <span>北京</span>
          <span>北京</span>
          <span>北京</span>
          <span>北京</span>
        </div>
      </div>
    );
  }
}



class SearchBar extends React.Component {
  constructor(props) {
    super(props);
  }
  renderNoCity(){
    return (
      <form className={classNames('inline')}>
        <input className={classNames('search-input')}/>
        <button className={classNames('search-button')}>搜索</button>
      </form>
    );
  }
  render() {
    var noCity = (this.props.config && this.props.config.no_city) || false;

    if(noCity) return this.renderNoCity();
    return (
      <form className={classNames('inline')}>
        <input className={classNames('search-input')}/>
        <CitySelecter/>
        <button className={classNames('search-button')}>搜索</button>
      </form>
    );
  }
}

export default SearchBar;
