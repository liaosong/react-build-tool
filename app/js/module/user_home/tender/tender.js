import React from 'react';
import { connect } from 'react-redux';
import { Link, IndexLink} from 'react-router';
import {pushState} from 'redux-router';
class Tender extends React.Component {
    render(){
        const links = [
            {url: "tender/checking", label: '审核中', id:2},
            {url: "tender/checked", label: '已审核', id:3}

        ].map(link =>
            <li className="info-index" key={link.id}>
                <Link to={link.url} activeClassName="active">{link.label}</Link>
            </li>
        );
        return (
            <div className="w-800 module-container tender-module">
                <ul className="info-indexs">
                    <li className="info-index">
                        <IndexLink activeClassName="active" to="tender">全部需求</IndexLink>
                    </li>
                    {links}
                </ul>
                <div className="tender-container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return state;
}
export default connect(mapStateToProps, {
    pushState
})(Tender);