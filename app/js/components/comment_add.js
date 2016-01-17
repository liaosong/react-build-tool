import React, {Component, PropTypes} from 'react';
import Modal from 'react-modal';
import {StarControl} from './star';

class CommentAdd extends Component{
    constructor(props){
        super(props);
        this.state = {
            isOpen: false,
            scoreTips: '',
            contentTips: ''
        };
    }

    onClose(){
        var {onClosed} = this.props;
        this.setState({
            isOpen: false
        });
        if(onClosed){
            onClosed();
        }
    }
    componentWillReceiveProps(nextProps){
        var {isOpen} = nextProps;
        this.setState({
            isOpen: isOpen
        });
    }

    checkScore(){
        var {score} = this.refs;
        if(/[12345]/.test(score.value)){
            this.setState({
                scoreTips: ''
            });
            return true;
        }else{
            this.setState({
                scoreTips: '评分必选'
            });
            return false;
        }
    }

    checkContent(){
        var {content} = this.refs;
        if(content.value){
            this.setState({
                contentTips: ''
            });
            return true;
        }else{
            this.setState({
                contentTips: '评论不能为空'
            });
            return false;
        }
    }

    onCommentCreate(e){
        e.preventDefault();
        var {content, score} = this.refs;
        var {onDataSubmit} = this.props;
        var comment = {
            content: content.value,
            score: score.value
        };
        if(this.checkScore() && this.checkContent()){
            onDataSubmit(comment);
        }
    }

    render(){
        var dialogStyle = {
            content:{
                width: '600px',
                height: '360px',
                top: "calc(50% - 180px)",
                left: "calc(50% - 300px)",
                border: 'none'
            },
            overlay:{
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
        return (
            <Modal style={dialogStyle} isOpen={this.state.isOpen} className="comment-add">
                <div className="x-close" onClick={this.onClose.bind(this)}></div>
                <form className="comment-form" onSubmit={this.onCommentCreate.bind(this)}>
                    <div className="title">我要点评</div>
                    <div className="comment-form-group">
                        <label className="inline">综合评价</label>
                        <StarControl className="inline ml-20" ref="score"></StarControl>
                        <div className="error-tips">{this.state.scoreTips}</div>
                    </div>
                    <div className="comment-form-group">
                        <label>详细描述</label>
                        <textarea className="comment-content" ref="content" onBlur={this.checkContent.bind(this)}></textarea>
                        <div className="error-tips">{this.state.contentTips}</div>
                    </div>

                    <div className="btn-group">
                        <button className="cancel" type="button" onClick={this.onClose.bind(this)}>取消</button>
                        <button className="submit ml-20" type="submit">确定</button>
                    </div>
                </form>
            </Modal>
        );
    }
}

export default CommentAdd;