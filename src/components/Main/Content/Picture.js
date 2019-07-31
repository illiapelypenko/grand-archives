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
    const { name, id, personalRating } = this.props;
    return (
      <a
        className={`content__picture content__item ${
          !this.state.isHovered ? "not-display" : ""
        }`}
        target='_blank'
        href={`${serverURL}/api/content/picture/${name}`}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <img src={`${serverURL}/api/content/picture/${name}`} alt='pic' />
        <ItemInfo
          info={this.props}
          token={this.props.token}
          id={id}
          display={this.state.isHovered ? true : false}
          personalRating={personalRating}
        />
      </a>
    );
  }
}
