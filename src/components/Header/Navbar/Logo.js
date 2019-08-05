import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Logo extends Component {
  render() {
    return (
      <div className='navbar__logo'>
        <Link to='/content'>Grand Archive</Link>
      </div>
    );
  }
}
