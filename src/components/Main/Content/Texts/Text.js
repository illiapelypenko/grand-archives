import React, { Component } from "react";
import serverURL from "../../../../serverURL";
import FileDownloadPic from "./FileDownloadPic";

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
    const { name, uploaderName } = this.props;
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
          <>
            <div className='content__item--hovered--up'>{name}</div>
            <div className='content__item--hovered--down'>{`By: ${uploaderName}`}</div>
          </>
        ) : null}
      </div>
    );
  }
}
