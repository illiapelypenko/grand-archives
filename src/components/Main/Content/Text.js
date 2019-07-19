import React, { Component } from "react";
import serverURL from "../../../serverURL";
import FileDownloadPic from "../../../images/fileDownloadPic";

export default class Text extends Component {
  state = {
    isHovered: false
  };

  handleMouseEnter = () => {
    this.setState({ isHovered: true });
  };

  handleMouseLeave = () => {
    this.setState({ isHovered: false });
  };
  render() {
    const { name } = this.props;
    return (
      <div
        className='content__text content__item'
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <a
          href={`
            ${serverURL}/api/content/text/${name}`}
          download
          rel='noopener noreferrer'
        >
          <FileDownloadPic />
          <p className='content__item-name'>{name}</p>
        </a>
        {this.state.isHovered ? (
          <div className='content__item--hovered'>{name}</div>
        ) : null}
      </div>
    );
  }
}
