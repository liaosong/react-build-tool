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
  render() {
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
