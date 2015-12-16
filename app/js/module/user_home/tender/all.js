import React, {Component} from 'react';
import { connect } from 'react-redux';
import {pushState} from 'redux-router';
import moment from 'moment';
import classNames from 'classnames';
import {removeTender} from '../../../actions/user_actions';

import {Meet} from '../../../components/Meet';
import {Exhibition} from '../../../components/exhibition';




class AllTender extends Component{
    constructor(props){
        super(props);
    }

    onTenderDelete(id){
        var {removeTender} = this.props;
        removeTender(id);
    }

    render(){
        var tenders = this.props.tenders || [];

        tenders = tenders.map((tender) => {
            if(tender.category == "会议"){
                return <Meet tender={tender} key={tender._id} onTenderDelete={this.onTenderDelete.bind(this)}></Meet>
            }else if(tender.category == "展览"){
                return <Exhibition tender={tender} key={tender._id} onTenderDelete={this.onTenderDelete.bind(this)}></Exhibition>
            }
        });
        let tips;
        if(tenders.length == 0){
            tips = (
                <div className="tender-tips">
                    <div>你还未发布过任何需求</div>
                    <div className="mt-7">去<a href="/">发布需求</a>吧！</div>
                </div>
            );
        }

        return (
            <div className="tender-list">
                {tenders}
                {tips}
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        tenders: state.userHome.tenders
    };
}
export default connect(mapStateToProps, {
    pushState: pushState,
    removeTender: removeTender
})(AllTender);