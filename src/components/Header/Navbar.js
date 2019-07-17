import React, { Component } from "react";
import Logo from "./Logo";
import Menu from "./Menu";

export default class Navbar extends Component {
  render() {
    return (
      <div className='header__navbar'>
        <Logo />
        <Menu isAuth={this.props.isAuth} logout={this.props.logout} />
      </div>
    );
  }
}
