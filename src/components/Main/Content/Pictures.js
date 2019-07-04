import React, { Component } from "react";
import Picture from "./Picture";

export default class pictures extends Component {
  render() {
    return (
      <div>
        {this.props.pictures.map((picture, index) => (
          <Picture name={picture} key={index} />
        ))}
      </div>
    );
  }
}
