import React, { useState, useEffect } from "react";
import videoSlide from "./videoSlide.jpg";
import pictureSlide from "./pictureSlide.jpg";
import audioSlide from "./audioSlide.jpg";
import textSlide from "./textSlide.jpg";
import "./Slider.scss";

const Slider = () => {
  const [slides, setSlides] = useState([
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
  ]);

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleClick = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setCurrentSlide(0);
    }
  };

  return (
    <div className='slider'>
      <div className='slider__slides' onClick={handleClick}>
        <div
          className='slider__slide'
          style={{
            backgroundImage: `url(${slides[currentSlide].img})`
          }}
        >
          <p className='slider__slide-text'>{slides[currentSlide].text}</p>
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
    </div>
  );
};

export default Slider;
