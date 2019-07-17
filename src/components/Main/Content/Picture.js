import React, { Component } from "react";
import serverURL from "../../../serverURL";

export default class Picture extends Component {
  render() {
    return (
      <a
        className='content__picture'
        target='_blank'
        href={`${serverURL}/api/content/picture/${this.props.name}`}
        title='fullscreen view'
      >
        <img
          src={`${serverURL}/api/content/picture/${this.props.name}`}
          alt='pic'
        />
      </a>
    );
  }
}
