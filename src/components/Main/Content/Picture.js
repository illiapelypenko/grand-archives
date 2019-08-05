import React, { Component } from "react";
import serverURL from "../../../serverURL";
import ItemInfo from "./Item/ItemInfo";

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
    const { name, id, personalRating, token } = this.props;
    const { isHovered } = this.state;

    return (
      <div
        className={`content__picture content__item ${
          !isHovered ? "not-display" : ""
        }`}
        // target='_blank'
        // href={`${serverURL}/api/content/picture/${name}`}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <img src={`${serverURL}/api/content/picture/${name}`} alt='pic' />
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
