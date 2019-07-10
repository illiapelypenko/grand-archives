import React, { Component } from "react";
import "./Header.scss";
import Slider from "./Slider";
import Navbar from "./Navbar";

export default class Header extends Component {
  render() {
    return (
      <div className='header'>
        <Slider />
        <Navbar isAuth={this.props.isAuth} />
      </div>
    );
  }
}
