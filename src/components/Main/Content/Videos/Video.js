import React, { Component } from "react";
import serverURL from "../../../../serverURL";
import ItemInfo from "../ItemInfo";

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
    const { name, uploaderName } = this.props;

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
        {this.state.isHovered ? <ItemInfo info={this.props} /> : null}
      </div>
    );
  }
}
