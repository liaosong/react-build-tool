import React from 'react';
import request from 'superagent';
import classNames from 'classnames';

class CodeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonText: '获取验证码',
            codeSend: false,
            waiting: false
        }
        this.timer = undefined;
    }
    disableBtn(){
        var count = 60;
        this.timer = setInterval(() => {
            count -= 1;

            if(count === 0){
                clearInterval(this.timer);
                this.setState({
                    buttonText: '重新获取验证码',
                    codeSend: false,
                    waiting: false
                });
                return;
            }

            this.setState({
                buttonText: '重新获取(' + count + ')',
                waiting: true
            });
        }, 1000);

    }
    componentWillUnmount(){
        clearInterval(this.timer);
    }

    getCode(){
        let {onGetCode} = this.props;
        var params = onGetCode();

        request.post('/api/send_security_code')
            .send(params)
            .end((err, res) =>{
                if(err){
                    this.setState({
                        codeSend: false
                    });
                }

                if(res.body.status == 0){
                    this.setState({
                        codeSend: true,
                        waiting: true
                    });
                    this.disableBtn();
                }
            });

    }


    render() {
        return (
            <div className="inline-b">
                <button disabled={this.state.waiting} className={classNames('code-button', { disabled: this.state.waiting })} onClick={this.getCode.bind(this)} type="button">{this.state.buttonText}</button>
            </div>
        );
    }
}

CodeButton.propTypes = {
    onGetCode: React.PropTypes.func.isRequired
}
export default CodeButton;
