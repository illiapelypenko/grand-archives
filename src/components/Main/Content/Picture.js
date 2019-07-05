import React, { Component } from "react";
import serverURL from "../../../serverURL";

export default class Picture extends Component {
  render() {
    return (
      <div className='content__picture'>
        <img
          src={`${serverURL}/api/content/picture/${this.props.name}`}
          alt='pic'
        />
      </div>
    );
  }
}
