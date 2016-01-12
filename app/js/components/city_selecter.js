import React from 'react';
import classNames from 'classnames';
import {cities} from '../global_data';

export class CitySelecter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cities: cities,
            isOpen: false,
            selectCity: cities[0]
        };
    }
    hide(){
        this.setState({
            isOpen: false
        });
    }

    show(){
        this.setState({
            isOpen: true
        });
    }
    toggle(evt){
        if(this.state.isOpen){
            this.hide();
        }else{
            this.show();
        }
        evt.stopPropagation();
    }
    setSelect(city){
        var {onSelectChange} = this.props;
        if(onSelectChange){
            if(city !== this.value){
                onSelectChange(this.value, city);
            }
        }
        if(city == "不限"){
            this.value = "";
        }else{
            this.value = city;
        }
        this.setState({
            selectCity: city
        });


    }
    windowClickHander(evt){
        if(this.state.isOpen){
            this.hide();
            evt.stopPropagation();
        }
    }
    componentWillUnmount(){
        window.removeEventListener('click', this.windowClickHander);
    }
    componentDidMount(){
        window.addEventListener('click', this.windowClickHander.bind(this));
    }
    render() {
        var containerClass = "city-selecter inline " + (this.props.className || '');
        var cities = this.state.cities.map((city) => {
            var className;
            if(this.state.selectCity === city){
                className = classNames('selected');
            }
            return (
                <li key={city} className={className} onClick={this.setSelect.bind(this, city)}>{city}</li>
            );
        });



        return (
            <div className={containerClass} onClick={this.toggle.bind(this)}>
                <input type="text" value={this.state.selectCity} readOnly className="value"/>
                <ul className={classNames('city-container','cleanfix', {show: this.state.isOpen})}>
                    {cities}
                </ul>
                <div className="arrow"></div>
            </div>
        );
    }
}

