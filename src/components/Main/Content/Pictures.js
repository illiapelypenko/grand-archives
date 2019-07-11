import React, { Component } from "react";
import Picture from "./Picture";

export default class Pictures extends Component {
  render() {
    return (
      <div className='content__pictures'>
        {this.props.pictures.map((picture, index) => (
          <Picture name={picture} key={index} />
        ))}
      </div>
    );
  }
}
