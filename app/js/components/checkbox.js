import React, {Component, PropTypes} from 'react';

class CheckBox extends Component{
    constructor(props){
        super(props);
        this.state = {
            checked: this.props.checked || false
        }
    }

    static propTypes = {
        label: React.PropTypes.string,
        checked: React.PropTypes.bool
    }

    onChange(){
        var {onAdd, onSubtract, value} = this.props;
        this.checked = !this.state.checked;
        this.setState({
            checked: this.checked
        });
        if(this.checked){
            onAdd(value);
        }else{
            onSubtract(value);
        }
    }
    render(){
        var className= this.props.className || "";
        className = "Checkbox " + className;

        var {label} = this.props;
        return (
            <div className={className}>
                <input ref="checkbox" type="checkbox" checked={this.state.checked} onChange={this.onChange.bind(this)}/>
                <div className="checkbox-label">
                    {label}
                </div>
            </div>
        );
    }
}

export default CheckBox;