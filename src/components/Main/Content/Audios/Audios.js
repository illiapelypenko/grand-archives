import React, { Component } from "react";
import Audio from "./Audio";

export default class Audios extends Component {
  render() {
    return (
      <div className='content__container'>
        {this.props.audios.map((audio, index) => (
          <Audio name={audio} key={index + Math.round(Math.random() * 1000)} />
        ))}
      </div>
    );
  }
}
