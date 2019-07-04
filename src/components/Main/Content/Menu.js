import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Menu extends Component {
  render() {
    return (
      <div>
        <Link to='/audios'>Audios</Link>
        <Link to='/videos'>Videos</Link>
        <Link to='/pictures'>Pictures</Link>
        <Link to='/texts'>Texts</Link>
      </div>
    );
  }
}
