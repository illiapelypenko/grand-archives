import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Menu extends Component {
  render() {
    return (
      <div className='header__menu'>
        <Link className='header__menu-item' to='/videos'>
          Videos
        </Link>
        <Link className='header__menu-item' to='/pictures'>
          Pictures
        </Link>
        <Link className='header__menu-item' to='/audios'>
          Audios
        </Link>
        <Link className='header__menu-item' to='/texts'>
          Texts
        </Link>
      </div>
    );
  }
}
