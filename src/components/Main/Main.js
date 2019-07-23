import React, { Component } from "react";
import Uploader from "./Uploader/Uploader";
import Content from "./Content/Content";
import Pages from "./Pages";
import "./Main.scss";

export default class Main extends Component {
  render() {
    return (
      <div className='main'>
        {this.props.isAuth ? <Uploader onUpload={this.props.onUpload} /> : null}
        <Content content={this.props.content} />
        <Pages />
      </div>
    );
  }
}
