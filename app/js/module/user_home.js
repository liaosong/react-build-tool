import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, Link, IndexLink} from 'react-router';
import Header from '../components/header';

import Footer from '../components/footer';

import classNames from 'classnames';
import {pushState} from 'redux-router';


class UserHome extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        console.log(this.props);
        const links = [
            {url: 'user_info', label: '我的账户', id:1},
            {url: 'tender', label: '我发布的需求', id:2},
            {url: 'enshrine', label: '我收藏的商家', id:3},

        ].map(link =>
            <li className="service-item" key={link.id}>
                <Link to={link.url} activeClassName="active">{link.label}</Link>
            </li>
        );
        return (
            <div className="container">
                <Header type="user"></Header>

                <div className="w-1000 s-center user-home-container">
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
export default connect(mapStateToProps, {
    pushState
})(UserHome);




