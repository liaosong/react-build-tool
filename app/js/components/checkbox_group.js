import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import CheckBox from './checkbox';

class CheckBoxGroup extends Component{
    constructor(props){
        super(props);
        this.value = this.props.value || [];
    }

    static propTypes = {
        group: React.PropTypes.array.isRequired,
        value: React.PropTypes.array
    }

    onAdd(item){
        let oldVal = this.value;
        this.value = oldVal.concat([item]);
    }

    onSubtract(value){
        let oldVal = this.value;
        this.value = _.filter(oldVal, (item)=>{return item != value});
    }

    render(){
        var {group} = this.props;


        let items = group.map((item, index) => {
            let checked = false;

            if(_.indexOf(this.value, item.value) !== -1){
                checked = true;
            }
            return (
                <CheckBox checked={checked} value={item.value} label={item.label} key={index} className="group-item" onAdd={this.onAdd.bind(this)} onSubtract={this.onSubtract.bind(this)}></CheckBox>
            );
        })

        let {className} = this.props;
        className = "Check-box-group " + className

        return (
            <div className={className}>
                {items}
            </div>
        );
    }
}

export default CheckBoxGroup;