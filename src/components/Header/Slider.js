import React, { Component } from "react";
import videoSlide from "../../images/videoSlide.jpg";
import pictureSlide from "../../images/pictureSlide.jpg";
import audioSlide from "../../images/audioSlide.jpg";
import textSlide from "../../images/textSlide.jpg";
import Eye from "../../images/eye-solid.js";
import EyeSlashed from "../../images/eye-slash-solid.js";
import "./Slider.scss";

export default class Slider extends Component {
  state = {
    show: true,
    slides: [
      {
        img: videoSlide,
        text: "Videos",
        description: "this is a video slide"
      },
      {
        img: pictureSlide,
        text: "Pictures",
        description: "this is a picture slide"
      },
      {
        img: audioSlide,
        text: "Audios",
        description: "this is a audios slide"
      },
      {
        img: textSlide,
        text: "Texts",
        description: "this is a text slide"
      }
    ],
    currentSlide: 0
  };

  handleClick = () => {
    const { slides, currentSlide } = this.state;
    if (currentSlide < slides.length - 1) {
      this.setState(state => ({
        currentSlide: state.currentSlide + 1
      }));
    } else {
      this.setState({ currentSlide: 0 });
    }
  };

  render() {
    const { slides, currentSlide, show } = this.state;
    return (
      <div className='slider'>
        {show ? (
          <>
            <div className='slider__slides' onClick={this.handleClick}>
              <div
                className='slider__slide'
                style={{
                  backgroundImage: `url(${slides[currentSlide].img})`
                }}
              >
                <p className='slider__slide-text'>
                  {slides[currentSlide].text}
                </p>
              </div>
            </div>
            <div className='slider__indicators'>
              {slides.map((slide, index) => {
                let state;
                if (index === currentSlide) {
                  state = "active";
                } else {
                  state = "disabled";
                }
                return (
                  <div
                    key={index}
                    className={`slider__indicator slider__indicator--${state}`}
                  />
                );
              })}
            </div>
          </>
        ) : null}
        <div className='slider__state-btn'>
          {show ? <Eye /> : <EyeSlashed />}
        </div>
      </div>
    );
  }
}
