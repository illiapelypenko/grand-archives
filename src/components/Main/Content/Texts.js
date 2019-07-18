import React, { Component } from "react";
import Text from "./Text";

export default class Texts extends Component {
  render() {
    return (
      <div className='content__container'>
        {this.props.texts.map((text, index) => (
          <Text name={text} key={index} />
        ))}
      </div>
    );
  }
}
