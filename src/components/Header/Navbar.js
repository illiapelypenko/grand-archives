import React, { Component } from "react";
import "./Navbar.scss";
import Logo from "./Logo";
import Menu from "./Menu";

export default class Navbar extends Component {
  render() {
    return (
      <div className='header__navbar'>
        <Logo />
        <Menu />
      </div>
    );
  }
}
