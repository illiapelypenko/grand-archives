import React, { Component } from "react";
import Uploader from "./Uploader";
import Content from "./Content/Content";
import serverURL from "../../serverURL";

export default class Main extends Component {
  state = {
    content: ""
  };

  componentDidMount() {
    this.fetchData();
  }

  updateData = () => {
    this.fetchData();
  };

  fetchData = () => {
    fetch(`${serverURL}/api/content/all`)
      .then(res => res.json())
      .then(data => this.setState({ content: data }));
  };

  render() {
    const { content } = this.state;

    return (
      <div>
        <Uploader onUpload={this.updateData} />
        <Content content={content} />
      </div>
    );
  }
}
