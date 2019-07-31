import React, { Component } from "react";
import serverURL from "../../../serverURL";
import FileDownloadPic from "./FileDownloadPic";
import ItemInfo from "./Item/ItemInfo";

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
    const { name, id } = this.props;
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
          <ItemInfo info={this.props} token={this.props.token} id={id} />
        ) : null}
      </div>
    );
  }
}
