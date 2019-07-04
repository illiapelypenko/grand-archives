import React, { Component } from "react";
import Text from "./Text";

export default class Texts extends Component {
  render() {
    return (
      <div>
        {this.props.texts.map((text, index) => (
          <Text name={text} key={index} />
        ))}
      </div>
    );
  }
}
