import React, { Component } from "react";
import Uploader from "./Uploader";
import Content from "./Content/Content";

export default class Main extends Component {
  render() {
    return (
      <div>
        {this.props.isAuth ? <Uploader onUpload={this.props.onUpload} /> : null}
        <Content content={this.props.content} />
      </div>
    );
  }
}
