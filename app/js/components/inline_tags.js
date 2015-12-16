import React, {Component, PropTypes} from 'react';

export class InlineTags extends Component{
    constructor(props){
        super(props);
    }

    static propTypes = {
        label: React.PropTypes.string.isRequired,
        data: React.PropTypes.array.isRequired
    }

    render(){
        var {label, data} = this.props;

        data = data || [];

        data = data.map((item, index) => {
            return (
                <span className="value-item" key={index}>{item}</span>
            );
        });

        return (
            <div className="inline-tags">
                <div className="label inline-b">{label}</div>
                <div className="values inline-b">
                    {data}
                </div>
            </div>
        );
    }
}