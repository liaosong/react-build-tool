import React from 'react';
import { connect } from 'react-redux';
import { Link, IndexLink} from 'react-router';

export class UserInfo extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        const links = [
            {url: "user_info/safe", label: '账户安全', id:2}

        ].map(link =>
                <li className="info-index" key={link.id}>
                    <Link to={link.url} activeClassName="active">{link.label}</Link>
                </li>
        );
        return (
            <div className="w-800 user-info-container">
                <ul className="info-indexs">
                    <li className="info-index">
                        <IndexLink activeClassName="active" to="/user_info">基础信息</IndexLink>
                    </li>
                    {links}
                </ul>
                <div className="info-content">
                    {this.props.children}
                </div>
            </div>

        );
    }
}