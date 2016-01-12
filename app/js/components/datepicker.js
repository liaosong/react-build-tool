import React, {Component} from 'react';
import ReactDom from 'react-dom';
import DayPicker from "react-day-picker";
import LocaleUtils from "react-day-picker/moment";
import classNames from 'classnames';
import moment from 'moment';
import "moment/locale/zh-cn";

export class Datepicker extends Component{
    constructor(props){
        super(props);

        this.state = {
            isOpen: false,
            inputValue: ''
        };
    }
    componentDidMount(){
        document.addEventListener('click', this.bodyHide.bind(this), false)
        var dom = ReactDom.findDOMNode(this).querySelector(".date-input");
        dom.onclick = function (e) {
            e.stopPropagation();
        }
        let {defaultValue} = this.props;
        if(defaultValue){
            this.setState({
                inputValue: moment(defaultValue).format("YYYY-MM-DD")
            });
        }

    }
    componentWillUnmount(){
        document.removeEventListener('click', this.bodyHide.bind(this), false)
        var dom = ReactDom.findDOMNode(this).querySelector(".date-input");
        dom.onclick = undefined;
    }

    bodyHide(e){
        if(!/DayPicker/.test(e.target.className)){
            this.setState({
                isOpen: false
            });
        }

    }

    show(){
        this.setState({
            isOpen: true
        });
    }


    hide(){
        this.setState({
            isOpen: false
        });
    }

    onDayClick(e, day){
        var {onDataChange} = this.props;
        var oldVal = this.state.inputValue;
        let date = moment(day).format("YYYY-MM-DD");
        this.setState({
            isOpen: false,
            inputValue: date
        });
        this.value = date;

        if(onDataChange){
            if(oldVal !== date){
                onDataChange(oldVal, date)
            }
        }
    }

    render(){
        let {className, placeholder} = this.props;
        className = 'cust-datepicker ' + className;
        return (
            <div className={className}>
                <input type="text" className="date-input" onFocus={this.show.bind(this)} value={this.state.inputValue} placeholder={placeholder} />
                <DayPicker localeUtils={LocaleUtils} locale="zh-cn" className={classNames('date-popup', {'hidden': !this.state.isOpen})} onDayClick={this.onDayClick.bind(this)}></DayPicker>
            </div>
        );
    }
}