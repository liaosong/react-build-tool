import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

class Star extends Component{
    constructor(props){
        super(props);
    }

    static propTypes = {
        score: React.PropTypes.number,
    }

    render(){
        var {score} = this.props;
        var stars = new Array(5).fill(1).map((item, index) => {
            var num = index + 1;
            if(num > score){
                return <li className="no-star" key={index}></li>
            }else{
                return <li className="star" key={index}></li>
            }
        })
        return (
            <ul className="score-container">
                {stars}
            </ul>
        );
    }
}


class StarControl extends Component{
    constructor(props){
        super(props);
        this.state = {
            score: 0
        };
    }
    componentDidMount(){
        this.value = this.state.score;
    }

    setScore(score){
        this.setState({
            score: score
        });
        this.value = score;
    }

    render(){
        var stars = new Array(5).fill(1).map((item, index) => {
            var num = index + 1;
            if(num > this.state.score){
                return <li className="no-star" key={index} onClick={this.setScore.bind(this, num)}></li>
            }else{
                return <li className="star" key={index} onClick={this.setScore.bind(this, num)}></li>
            }
        })
        return (
            <ul className={classNames("score-container", this.props.className)}>
                {stars}
            </ul>
        );
    }
}

export {Star, StarControl};