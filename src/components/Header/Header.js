import React, { Component } from "react";
import Slider from "./Slider";
import Navbar from "./Navbar";

export default class Header extends Component {
  render() {
    return (
      <div>
        <Slider />
        <Navbar />
      </div>
    );
  }
}
