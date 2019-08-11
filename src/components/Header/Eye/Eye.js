import React from "react";
import EyePic from "./EyePic.js";
import EyeSlashed from "./EyeSlashPic.js";

const Eye = ({ showSlider, onClick }) => {
  return (
    <div className={`header__slider-state-btn`} onClick={onClick}>
      {showSlider ? <EyePic /> : <EyeSlashed />}
    </div>
  );
};

export default Eye;
