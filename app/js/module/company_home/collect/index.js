import React, {Component} from 'react';
import { connect, dispatch} from 'react-redux';
import {pushState} from 'redux-router';

class Collect extends Component{

    render(){
        return (
            <div>collect</div>
        );
    }
}

function mapStateToProps(state){
    return state;
}
export default connect(mapStateToProps, {
    pushState: pushState
})(Collect);