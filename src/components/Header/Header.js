import React, { Component } from "react";
import "./Header.scss";
import Slider from "./Slider";
import Navbar from "./Navbar";

export default class Header extends Component {
  render() {
    const { isAuth, slider } = this.props;
    return (
      <div className='header'>
        <Slider slider={slider} />
        <Navbar isAuth={isAuth} />
      </div>
    );
  }
}
