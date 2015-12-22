import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, Link, IndexLink} from 'react-router';
import Header from '../components/header';

import Footer from '../components/footer';

import classNames from 'classnames';
import {pushState} from 'redux-router';



class CompanyHome extends React.Component {
    constructor(props, context){
        super(props, context);
    }
    render() {
        const links = [
            {url: 'company_info', label: '我的账户', id:1},
            {url: 'management', label: '我的商家页面', id:2},
            {url: 'collect', label: '我收到的需求', id:3},

        ].map(link =>
                <li className="service-item" key={link.id}>
                    <Link to={link.url} activeClassName="active">{link.label}</Link>
                </li>
        );
        return (
            <div className="container">
                <Header type="company"></Header>

                <div className="w-1000 s-center company-home-container">
                    <ul className="index-container inline">
                        {links}
                    </ul>
                    <div className="content-container inline">
                        {this.props.children}
                    </div>
                </div>
                <Footer></Footer>

            </div>
        );
    }

}

function mapStateToProps(state){
    return state;
}
export default connect(mapStateToProps, {pushState})(CompanyHome);




