import React, {Component} from 'react';
import { connect, dispatch} from 'react-redux';
import {pushState} from 'redux-router';
import { Link, IndexLink} from 'react-router';

class CompanyInfo extends Component{

    render(){
        return (
            <div className="w-800 module-container">
                <ul className="info-indexs">
                    <li className="info-index">
                        <IndexLink activeClassName="active" to="/company_info">基本资料</IndexLink>
                    </li>
                    <li className="info-index">
                        <Link to="/company_info/safe" activeClassName="active">账户安全</Link>
                    </li>
                </ul>
                <div className="info-content">
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
    pushState: pushState
})(CompanyInfo);