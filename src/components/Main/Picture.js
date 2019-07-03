import React, { Component } from "react";
import serverURL from "../../serverURL";

export default class Picture extends Component {
  render() {
    return (
      <div>
        <img src={`${serverURL}/picture/${this.props.name}`} alt='picture' />
      </div>
    );
  }
}
