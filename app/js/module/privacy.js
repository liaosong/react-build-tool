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
                    <h2 className="mb-30">隐私政策</h2>

                    <p className="mb-30">神州会展（www.szhz86.com，以下全部用“本网站”）隐私声明系本网站保护企业用户、个人会员隐私的承诺。鉴于网络的特性，本网站将无可避免地与您产生直接或间接的互动关系，故特此说明本网站对企业用户、个人会员信息所采取的收集、使用和保护政策，请您务必仔细阅读：</p>

                    <h3>信息的收集和使用</h3>

                    <p className="mb-30">当您在注册本网站会员时，我们要求您必须以填表的形式提供有关信息，如您的真实姓名，地址，电话号码，电子邮件地址，所提供的服务和产品的简短 说明等详细资料，只要您在本网站注册成功并登陆服务器，我们将可以识别您及您的企业资料。我们将根据这些统计数据来给我们的服务分类，例如公司服务类型、公司所在区域等以便有针对性地向我们的用户提供新的服务和机会。我们将通过您的邮件地址来通知您的这些新需求和机会。</p>

                    <h3>信息的公开和共享</h3>
                    <p className="mb-30">本网站将公布供应商提交的产品信息、报价，而其他用户可以查询这些商业机会、产品信息及报价。 我们不会向任何第三方提供，出售，出租，分享和交易用户的个人信息，除非第三方和本网站一起为网站和用户提供服务并且在该服务结束后将被禁止访问包括其以前能够访问的所有这些资料删除。当我们被法律强制或依照政府要求提供您的信息时我们将善意地披露您的资料。</p>
                    <h3>Cookies的使用</h3>
                    <p className="mb-30">本网站会使用Cookies,以便于能够为您提供更加周到的个性化服务。当您登陆我们的网站时，本网站 会使用Cookies存储相关信息，追访您的个人喜好、使用习惯，使我们的网站在您再次访问时可以辨认您的身份，从而向您提供感兴趣的信息资料或储存密 码，以便您造访本网站时不必每次重复输入密码。您也可以关闭此项功能，本网站将停止Cookies为您提供的服务。</p>
                    <h3>外部链接与安全</h3>
                    <p className="mb-30">本网站将链接其他网站的地址，我们可能在需要的时候增加商业伙伴或共用品牌的网站链接，但是提供给他们的将仅仅是综合信息，我们将不会公开您的身份。本网站将对您所提供的资料进行严格的管理及保护，本网站将使用相应的技术及安全措施，防止您的个人资料丢失、被盗用或遭窜改。但请注意在因特网上不存在“完善的安全措施”，因此我们不承诺上述资料绝对安全。</p>
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