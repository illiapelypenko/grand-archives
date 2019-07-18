import React, { Component } from "react";
import serverURL from "../../../serverURL";

export default class Audio extends Component {
  render() {
    return (
      <div className='content__audio content__item'>
        <audio controls>
          <source
            src={`${serverURL}/api/content/audio/${this.props.name}`}
            type='audio/mpeg'
          />
        </audio>
      </div>
    );
  }
}
