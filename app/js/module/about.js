import React, {Component} from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { connect } from 'react-redux';


class About extends Component{


    render(){
        return (
            <div className="container">
                <Header></Header>
                <div className="w-1000 s-center our-container">
                    <h2 className="mb-30">关于我们</h2>

                    <p className="mb-30">神州会展是成都快乐马儿网络科技有限公司推出的会展O2O平台，依托全国海量服务商及参展商数据库，通过对线上线下的聚合，为用户提供一站式服务。</p>

                    <h3>我们的愿景：成为中国最大的会展资源供应平台</h3>

                    <p className="mb-30">公司坚持以“为企业和团体客户创造更便携高效的会议展览”为导向，为用户提供类型更全、数量更多的服务商信息。目前，神州会展正在努力成为中国会展O2O平台的行业标杆。</p>

                    <h3 className="mb-30">我们的使命：让会议展览活动变得更加简单</h3>

                    <h3>我们的业务</h3>
                    <p className="mb-30">做参展商和会展服务商的资源整合,参展商可以通过我们的平台 效、快捷、精准地找到优质的会展服务商资源,服务商也可以通过我们的平台获得更多会
                        展服务业务。</p>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}

function store2props({authService}) {
    return {
        currentUser: authService.currentUser,
    };
}

export default connect(store2props)(About);