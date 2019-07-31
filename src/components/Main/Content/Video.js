import React, { Component } from "react";
import serverURL from "../../../serverURL";
import ItemInfo from "./Item/ItemInfo";

export default class Video extends Component {
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
        className='content__video content__item'
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <video controls>
          <source
            src={`${serverURL}/api/content/video/${name}`}
            type='video/mp4'
          />
        </video>
        {this.state.isHovered ? (
          <ItemInfo info={this.props} token={this.props.token} id={id} />
        ) : null}
      </div>
    );
  }
}
