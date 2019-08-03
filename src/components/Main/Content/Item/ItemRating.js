import React, { Component } from "react";
import serverURL from "../../../../serverURL";
import "./Rating.scss";

export default class ItemRating extends Component {
  state = {
    personalRating: this.props.personalRating || null,
    hoveredItem: null,
    isHovered: false,
    className: "disabled",
    set: false
  };

  handleMouseEnter = (e, i) => {
    this.setState({ hoveredItem: i, isHovered: true });
  };

  handleMouseLeave = (e, i) => {
    this.setState({ hoveredItem: null, isHovered: false });
  };

  handleClick = async (e, i) => {
    e.preventDefault();
    this.setState({ personalRating: i, set: true });
    await fetch(`${serverURL}/api/content/evaluate`, {
      method: "POST",
      body: JSON.stringify({
        token: this.props.token,
        rating: i,
        itemId: this.props.id
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
  };

  static getDerivedStateFromProps(props, state) {
    if (state.personalRating !== props.personalRating && !state.set) {
      return { personalRating: props.personalRating };
    }
    return null;
  }

  render() {
    const stars = [];
    const { personalRating, hoveredItem, isHovered } = this.state;

    for (let i = 0; i < 5; i++) {
      let className = "disabled";
      if (!isHovered && i <= personalRating) {
        className = "enabled";
      }
      if (isHovered && i <= hoveredItem) {
        className = "enabled";
      }
      stars.push(
        <p
          onClick={e => this.handleClick(e, i)}
          onMouseEnter={e => this.handleMouseEnter(e, i)}
          onMouseLeave={e => this.handleMouseLeave(e, i)}
          className={className}
        >
          ★
        </p>
      );
    }

    return (
      <div
        className={`content__item-rating ${this.props.token ? "" : "hidden"}`}
      >
        <div className='rating--personal'>{stars}</div>
      </div>
    );
  }
}
