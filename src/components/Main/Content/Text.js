import React, { Component } from "react";
import serverURL from "../../../serverURL";
import FileDownloadPic from "../../../images/fileDownloadPic";

export default class Text extends Component {
  render() {
    return (
      <div className='content__text content__item'>
        <a
          href={`
            ${serverURL}/api/content/text/${this.props.name}`}
          download
          rel='noopener noreferrer'
        >
          <FileDownloadPic />
        </a>
      </div>
    );
  }
}
