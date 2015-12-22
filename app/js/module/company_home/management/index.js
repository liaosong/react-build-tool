import React, {Component} from 'react';
import { connect, dispatch} from 'react-redux';
import {pushState} from 'redux-router';
import { Link, IndexLink} from 'react-router';


class Management extends Component{

    render(){
        return (
            <div className="w-800 module-container">
                <ul className="info-indexs">
                    <li className="info-index">
                        <IndexLink activeClassName="active" to="/management">公司信息</IndexLink>
                    </li>
                    <li className="info-index">
                        <Link to="/management/cases" activeClassName="active">成功案例</Link>
                    </li>
                    <li className="info-index">
                        <Link to="/management/services" activeClassName="active">服务或产品</Link>
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
})(Management);