import React, { Component } from "react";
import Uploader from "./Uploader";
import Content from "./Content";

export default class Main extends Component {
  state = {
    displaySettings: {}
  };

  render() {
    const { displaySettings } = this.state;

    return (
      <div>
        <Uploader />
        <Content displaySettings={displaySettings} />
      </div>
    );
  }
}
