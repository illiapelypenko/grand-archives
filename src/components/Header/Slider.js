import React, { Component } from "react";
import videoSlide from "../../images/videoSlide.jpg";
import pictureSlide from "../../images/pictureSlide.jpg";

export default class Slider extends Component {
  state = {
    slides: [
      {
        img: videoSlide,
        text: "Videos",
        description: "this is video slide"
      },
      {
        img: pictureSlide,
        text: "Pictures",
        description: "this is picture slide"
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
    const { slides, currentSlide } = this.state;
    return (
      <div className='header__slider' onClick={this.handleClick}>
        <div className='header__slides'>
          <img src={slides[currentSlide].img} alt='slide' />
        </div>
        <div className='header__slide-indicator header__slide-indicators'>
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
                className={`header__slide-indicator header__slide-indicator--${state}`}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
