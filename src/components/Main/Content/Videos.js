import React, { Component } from "react";
import Video from "./Video";

export default class Videos extends Component {
  render() {
    return (
      <div>
        {this.props.videos.map((video, index) => (
          <Video name={video} key={index} />
        ))}
      </div>
    );
  }
}
