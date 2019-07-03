import React, { Component } from "react";
import serverURL from "../../serverURL";

export default class Audio extends Component {
  render() {
    return (
      <div>
        <audio controls>
          <source
            src={`${serverURL}/audio/${this.props.name}`}
            type='audio/mpeg'
          />
        </audio>
      </div>
    );
  }
}
