import React, { Component } from "react";
import serverURL from "../../../../serverURL";

export default class Audio extends Component {
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
        className='content__audio content__item'
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <audio controls>
          <source
            src={`${serverURL}/api/content/audio/${name}`}
            type='audio/mpeg'
          />
        </audio>
        <p className='content__item-name'>{name}</p>
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
