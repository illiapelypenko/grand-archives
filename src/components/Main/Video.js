import React, { Component } from "react";

export default class Video extends Component {
  render() {
    return (
      <div>
        <video controls>
          <source
            src={`http://localhost:5000/video/${this.props.name}`}
            type='video/mp4'
          />
        </video>
      </div>
    );
  }
}
