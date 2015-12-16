import React, {Component} from 'react';
import { connect } from 'react-redux';
import {pushState} from 'redux-router';
import {removeTender} from '../../../actions/user_actions';
import _ from 'lodash';

import {Meet} from '../../../components/Meet';
import {Exhibition} from '../../../components/exhibition';

class CheckingTender extends Component{
    constructor(props){
        super(props);
    }

    onTenderDelete(id){
        var {removeTender} = this.props;
        removeTender(id);
    }

    render(){
        console.log(this.props);
        var tenders = this.props.tenders || [];
        tenders = _.filter(tenders, (tender) => {
            return tender.create_status.status == "pending";
        });

        tenders = tenders.map((tender) => {
            if(tender.category == "会议"){
                return <Meet tender={tender} key={tender._id} onTenderDelete={this.onTenderDelete.bind(this)}></Meet>
            }else if(tender.category == "展览"){
                return <Exhibition tender={tender} key={tender._id} onTenderDelete={this.onTenderDelete.bind(this)}></Exhibition>
            }
        });


        return (
            <div className="tender-list">
                {tenders}
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
})(CheckingTender);