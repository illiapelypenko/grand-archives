import React, { Component } from "react";
import EyePic from "./EyePic.js";
import EyeSlashed from "./EyeSlashPic.js";

export default class Eye extends Component {
  render() {
    const { showSlider, onClick, menuOpened } = this.props;
    return (
      <div
        className={`header__slider-state-btn ${menuOpened ? "pdtop" : null}`}
        onClick={onClick}
      >
        {showSlider ? <EyePic /> : <EyeSlashed />}
      </div>
    );
  }
}