import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Logo extends Component {
  render() {
    return (
      <div className='header__logo'>
        <Link to='/'>Grand Archive</Link>
      </div>
    );
  }
}
