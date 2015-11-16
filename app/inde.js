import React from 'react';
import ReactDom from 'react-dom';


class HelloWorld extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div>HelloWorldkakaaaa</div>;
  }
}

ReactDom.render(<HelloWorld></HelloWorld>, document.getElementById("content"));


