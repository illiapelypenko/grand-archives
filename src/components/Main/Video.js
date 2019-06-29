import React, { Component } from "react";
import serverURL from "../../serverURL";

export default class Video extends Component {
  render() {
    return (
      <div>
        <video controls>
          <source
            src={`${serverURL}/video/${this.props.name}`}
            type='video/mp4'
          />
        </video>
      </div>
    );
  }
}
