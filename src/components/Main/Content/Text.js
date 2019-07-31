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
    const { name, id, personalRating, token } = this.props;
    const { isHovered } = this.state;

    return (
      <div
        className={`content__picture content__item ${
          !isHovered ? "not-display" : ""
        }`}
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
        <ItemInfo
          info={this.props}
          token={token}
          id={id}
          display={isHovered ? true : false}
          personalRating={personalRating}
        />
      </div>
    );
  }
}
