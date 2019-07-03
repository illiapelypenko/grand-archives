import React, { Component } from "react";
import serverURL from "../../serverURL";

export default class Text extends Component {
  render() {
    return (
      <div>
        <a
          href={`
            ${serverURL}/text/${this.props.name}`}
          download
        >
          DOWNLOAD
        </a>
      </div>
    );
  }
}
