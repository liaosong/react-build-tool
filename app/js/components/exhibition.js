import React, {Component} from 'react';
import moment from 'moment';
import classNames from 'classnames';


export class Exhibition extends Component{
    constructor(props){
        super(props);
    }
    deleteTender(id){
        var {onTenderDelete} = this.props;

        onTenderDelete(id);
    }
    render(){
        var {tender} = this.props;

        var statusElem;
        if(tender.create_status.status == 'done'){
            statusElem = (
                <div className="result-box">
                    <div className="step">已审核</div>
                    <div className={classNames('result', {'success': tender.create_status.result == '通过', 'error': tender.create_status.result == '未通过'})}>{tender.create_status.result}</div>
                </div>
            );
        }else{
            statusElem = (
                <div>审核中</div>
            );
        }

        return (
            <div className="tender-item">
                <div className="tender-head">
                    <div className="title inline-b">{tender.title}</div>
                    <div className="create-time inline-b">{moment(tender.created_at).format("YYYY-MM-DD")}</div>
                </div>
                <div className="tender-body">
                    <div className="tender-info inline">
                        <div className="left-side inline">
                            <div className="t-row">
                                <span className="label">参展时间：</span>
                                <span className="value">{moment(tender.begin_date).format("YYYY-MM-DD")}</span>
                                <span>—</span>
                                <span>{moment(tender.end_date).format("YYYY-MM-DD")}</span>
                            </div>
                            <div className="t-row">
                                <span className="label">展位面积：</span>
                                <span className="value">{tender.booth_area}</span>
                            </div>
                            <div className="t-row">
                                <span className="label">详情：</span>
                                <span className="value">{tender.others}</span>
                            </div>
                        </div>
                        <div className="right-side inline">
                            <div className="t-row">
                                <span className="label">参展城市：</span>
                                <span className="value">{tender.address}</span>
                            </div>
                            <div className="t-row">
                                <span className="label">展位预算：</span>
                                <span className="value">{tender.budget}</span>
                            </div>
                        </div>
                    </div>
                    <div className="status inline">
                        {statusElem}
                    </div>
                    <div className="action inline"><button onClick={this.deleteTender.bind(this, tender._id)}>删除</button></div>
                </div>
            </div>
        )
    }
}