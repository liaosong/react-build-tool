import React from 'react';
import classNames from 'classnames';

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <footer>
        <div className={classNames("f-service-container")}>
          <a className={classNames("service-item")} href="/about">关于我们</a>
          <a className={classNames("service-item")} href="/statement">服务条款</a>
          <a className={classNames("service-item")} href="/privacy">隐私政策</a>
          <a className={classNames("service-item")} href="">常见问题</a>
        </div>
        <div className={classNames("f-about-us")}>
          <div className={classNames("concat-us", "inline-flow")}>
            <h3>我们期待您的声音</h3>
            <p>客户服务电话：15928124305</p>
            <p>客户服务邮箱：szhz86@163.com</p>
          </div>
          <div className={classNames("company-info", "inline-flow")}>
            <h3>成都快乐马儿网络科技有限公司</h3>
            <p>Copyright©2015 Happy Horse Team All Right Reserved</p>
            <p>蜀ICP备15026503号-1</p>
          </div>
          <div className={classNames("wechat-fllow", "inline-flow")}>
            <h3>请关注我们</h3>
            <img src={"/images/wechat.png"}/>

          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
