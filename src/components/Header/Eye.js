import React, { Component } from "react";
import EyeClear from "../../images/eye-solid.js";
import EyeSlashed from "../../images/eye-slash-solid.js";

export default class Eye extends Component {
  render() {
    const { showSlider, onClick } = this.props;
    return (
      <div className='header__slider-state-btn' onClick={onClick}>
        {showSlider ? <EyeClear /> : <EyeSlashed />}
      </div>
    );
  }
}
