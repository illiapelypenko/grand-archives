import React, { Component } from "react";
import serverURL from "../../../serverURL";
import ItemInfo from "./Item/ItemInfo";

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
        <audio controls>
          <source
            src={`${serverURL}/api/content/audio/${name}`}
            type='audio/mpeg'
          />
        </audio>
        <p className='content__item-name'>{name}</p>
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
