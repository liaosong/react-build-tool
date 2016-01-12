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
        onStatusChange: React.PropTypes.func,
        multiple: React.PropTypes.bool,
    }

    componentDidMount(){
        let {value, multiple} = this.props;
        if(multiple){
            value = value || [];
            value = value.map((item) => {
                return item.url;
            });
            this.value = value;

        }else{
            this.value = value;
        }
        this.setState({
            value: value
        });

    }

    onClick(){
        var {fileInput} = this.refs;
        fileInput.click();
    }
    onDelete(delItem){
        this.setState({
            value: this.state.value.filter((item) => {return item != delItem})
        });
        this.value = this.state.value;
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

        //onStatusChange({status: 'uploading'});
        request.post('/api/upload').send(formData).end((err, res) => {
            if(err || res.body.status !== 0){
                //onStatusChange({status: 'error'});
            }
            let urls = res.body.data;
            if(multiple){
                let oldVal = this.state.value || [];
                urls = urls.map((item)=>{
                    return item.url;
                });
                var values = new Set(oldVal.concat(urls));
                values = Array.from(values);
                this.value = values;
                this.setState({
                    value: values
                });
            }else{
                this.value = urls[0].url
                this.setState({
                    value: this.value
                });
            }
            //onStatusChange({status: 'done', data: this.value})
        });
    }

    renderSingle(){
        var {text, value} = this.props;
        var className= this.props.className || "";
        className = "Upload " + className;
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
        return (
            <div className={className} onClick={this.onClick.bind(this)} style={labelStyle}>
                <input type="file" style={{display: 'none'}} ref="fileInput" onChange={this.onChange.bind(this)}/>
                {labels}
            </div>
        );
    }

    renderMultiple(){
        var className= this.props.className || "";
        className = "Upload " + className;
        let {value} = this.state;
        let imgItems;
        if(value){
            imgItems = value.map((item, index) => {
                return (
                    <div className="img-item inline" key={index}>
                        <img src={`/${item}`} className="img-size"></img>
                        <div className="mask" onClick={this.onDelete.bind(this, item)}></div>
                    </div>
                );
            })
        }

        return (
            <div className={className} >
                <input type="file" style={{display: 'none'}} ref="fileInput" onChange={this.onChange.bind(this)} multiple/>
                <div className="upload-label" >
                    {imgItems}
                    <div className="label-icon img-item inline" onClick={this.onClick.bind(this)}></div>
                </div>
            </div>
        );
    }

    render(){
        var {multiple} = this.props;
        if(multiple){
            return this.renderMultiple();
        }else{
            return this.renderSingle();
        }
    }
}

export default Upload;