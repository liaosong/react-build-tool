import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, Link } from 'react-router';
import Header from '../components/header';

import Footer from '../components/footer';

import classNames from 'classnames';



class UserHome extends React.Component {
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
                <Header type="user"></Header>

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

export default connect(headerState)(UserHome);