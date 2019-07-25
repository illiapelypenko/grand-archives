import React, { Component } from "react";
import serverURL from "../../../../serverURL";

export default class Picture extends Component {
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
    const { name, uploaderName, rating } = this.props;
    return (
      <a
        className='content__picture content__item'
        target='_blank'
        href={`${serverURL}/api/content/picture/${name}`}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <img src={`${serverURL}/api/content/picture/${name}`} alt='pic' />
        {this.state.isHovered ? (
          <>
            <div className='content__item--hovered--up'>{name}</div>
            <div className='content__item--hovered--down'>
              <p>{`By: ${uploaderName}`}</p>
              <div className='content__item-rating'>{rating}</div>
            </div>
          </>
        ) : null}
      </a>
    );
  }
}
