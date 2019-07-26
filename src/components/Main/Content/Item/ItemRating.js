import React, { Component } from "react";
import StarStroked from "./StarStroked";

export default class ItemRating extends Component {
  handleMouseEnter = index => {
    console.log(index);
  };

  render() {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <StarStroked key={i} onMouseEnter={this.handleMouseEnter} index={i} />
      );
    }
    return (
      <div className='content__item-rating'>
        <div className='rating--personal'>{stars}</div>
        <div className='rating--general'>{this.props.rating}</div>
      </div>
    );
  }
}
