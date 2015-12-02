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
    }
    disableBtn(){
        var count = 60;
        var countdown = setInterval(() => {
            count -= 1;

            if(count === 0){
                clearInterval(countdown);
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
    getCode(){
        let {onGetCode} = this.props;
        var phoneNumber = onGetCode();

        request.post('/api/send_security_code')
            .send({phone_number: phoneNumber})
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
                <button disabled={this.state.waiting} className={classNames('code-button', { disabled: this.state.waiting })} onClick={this.getCode.bind(this)}>{this.state.buttonText}</button>
            </div>
        );
    }
}

CodeButton.propTypes = {
    onGetCode: React.PropTypes.func.isRequired
}
export default CodeButton;
