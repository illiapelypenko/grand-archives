import React, { Component } from "react";
import Logo from "./Logo";
import Menu from "./Menu";

export default class Navbar extends Component {
  render() {
    const { isAuth, logout, name } = this.props;

    return (
      <div className='header__navbar'>
        <Logo />
        <Menu isAuth={isAuth} logout={logout} name={name} />
      </div>
    );
  }
}
