import React, {Component, PropTypes} from 'react';
import request from 'superagent';
import _ from 'lodash';
class Upload extends Component{
    constructor(props){
        super(props);
        this.state = {

        };
    }
    static propTypes = {
        text: React.PropTypes.string,
        onStatusChange: React.PropTypes.func.isRequired,
        multiple: React.PropTypes.bool
    }

    onClick(){
        var {fileInput} = this.refs;
        fileInput.click();
    }

    onChange(){
        var {fileInput} = this.refs;
        var formData = new FormData();
        var files = fileInput.files || [];
        var {onStatusChange, multiple} = this.props;
        _.forEach(files, (file) => {
            if (!file.type.match('image.*')) {
                return;
            }
            formData.append('photos', file, file.name);
        });

        onStatusChange({status: 'uploading'});
        request.post('/api/upload').send(formData).end((err, res) => {
            if(err || res.body.status !== 0){
                onStatusChange({status: 'error'});
            }
            let urls = res.body.data;
            if(multiple){
                this.value = urls.map((item)=>{
                    return item.url;
                });
            }else{
                this.value = urls[0].url
                this.setState({
                    value: this.value
                });
            }
            onStatusChange({status: 'done', data: this.value})
        });
    }

    render(){
        var className= this.props.className || "";
        className = "Upload " + className;

        var {text, multiple, value} = this.props;
        var labelStyle = {};
        let labels;

        if(this.state.value) {
            labelStyle.backgroundImage = `url(/${this.state.value})`;
            className = className + ' no-border';
        }else if(value){
            labelStyle.backgroundImage = `url(/${value})`;
            className = className + ' no-border';
        }else{
            labels = (
                <div className="upload-label" >
                    <div className="label-icon"></div>
                    <div className="label-text">{text}</div>
                </div>
            );
        }


        let inputFild = multiple ? (
            <input type="file" style={{display: 'none'}} ref="fileInput" onChange={this.onChange.bind(this)} multiple/>
        ):(<input type="file" style={{display: 'none'}} ref="fileInput" onChange={this.onChange.bind(this)}/>)
        return (
            <div className={className} onClick={this.onClick.bind(this)} style={labelStyle}>
                {inputFild}
                {labels}
            </div>
        );
    }
}

export default Upload;