import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

export class Gallery extends Component{
    constructor(props){
        super(props);
        this.state = {
            selected: ''
        }
    }

    static propTypes = {
        images: React.PropTypes.array,
    }

    setSelected(item){
        this.setState({
            selected: item
        });
    }

    componentDidMount(){
        var {images} = this.props;
        this.setState({
            selected: images[0]
        });
    }

    previousImg(){
        var {images} = this.props;
        var currentIndex = images.findIndex((item) => {
            return item == this.state.selected;
        });
        if(currentIndex > 0){
            this.setState({
                selected: images[currentIndex - 1]
            });
        }
    }
    nextImg(){
        var {images} = this.props;
        var currentIndex = images.findIndex((item) => {
            return item == this.state.selected;
        });
        if(currentIndex < images.length - 1){
            this.setState({
                selected: images[currentIndex + 1]
            });
        }
    }

    render(){
        var {images} = this.props;
        var sides = images.map((item, index) => {
            return (
                <div className="side" onClick={this.setSelected.bind(this, item)} key={index}>
                    <img src={item} className={classNames("side-img", {'active': item == this.state.selected})}/>
                </div>
            );
        });
        return (
            <div className={classNames("gallery", this.props.className)}>
                <div className="main-box">
                    <img src={this.state.selected} className="main-img"/>
                </div>
                <div className="side-container">
                    {sides}
                </div>
                <div className="previous" onClick={this.previousImg.bind(this)}></div>
                <div className="next" onClick={this.nextImg.bind(this)}></div>
            </div>
        );
    }
}
