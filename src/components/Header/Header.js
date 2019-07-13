import React, { Component } from "react";
import Slider from "./Slider";
import Navbar from "./Navbar";

export default class Header extends Component {
  render() {
    const { isAuth, slider } = this.props;
    return (
      <div className='header'>
        <Slider slider={slider} />
        <Navbar isAuth={isAuth} logout={this.props.logout} />
      </div>
    );
  }
}
