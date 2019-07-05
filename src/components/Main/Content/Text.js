import React, { Component } from "react";
import serverURL from "../../../serverURL";

export default class Text extends Component {
  render() {
    return (
      <div className='content__text'>
        <a
          href={`
            ${serverURL}/api/content/text/${this.props.name}`}
          download
          target='_blank'
          rel='noopener noreferrer'
        >
          DOWNLOAD
        </a>
      </div>
    );
  }
}
