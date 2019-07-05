import React, { Component } from "react";
import serverURL from "../../../serverURL";

export default class Video extends Component {
  render() {
    return (
      <div className='content__video'>
        <video controls>
          <source
            src={`${serverURL}/api/content/video/${this.props.name}`}
            type='video/mp4'
          />
        </video>
      </div>
    );
  }
}
