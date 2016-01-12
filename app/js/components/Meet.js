import React, {Component} from 'react';

import moment from 'moment';
import classNames from 'classnames';

export class Meet extends Component{
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
        if (tender.create_status.status == 'done') {
            statusElem = (
                <div className="result-box">
                    <div className="step">已审核</div>
                    <div
                        className={classNames('result', {'success': tender.create_status.result == '通过', 'error': tender.create_status.result == '未通过'})}>{tender.create_status.result}</div>
                </div>
            );
        } else {
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
                                <span className="label">会议时间：</span>
                                <span className="value">{moment(tender.begin_date).format("YYYY-MM-DD")}</span>
                            </div>
                            <div className="t-row">
                                <span className="label">参加人数：</span>
                                <span className="value">{tender.min_join_num}</span>
                                <span>—</span>
                                <span>{tender.max_join_num}</span>

                            </div>
                            <div className="t-row">
                                <span className="label">详情：</span>
                                <span className="value">{tender.others}</span>
                            </div>
                        </div>
                        <div className="right-side inline">
                            <div className="t-row">
                                <span className="label">会议城市：</span>
                                <span className="value">{tender.address}</span>
                            </div>
                            <div className="t-row">
                                <span className="label">会议预算：</span>
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
