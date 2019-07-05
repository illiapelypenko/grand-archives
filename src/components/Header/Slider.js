import React, { Component } from "react";

export default class Slider extends Component {
  render() {
    return (
      <div className='slider'>
        <div className='slides' />
        <div className='indicator' />
      </div>
    );
  }
}
