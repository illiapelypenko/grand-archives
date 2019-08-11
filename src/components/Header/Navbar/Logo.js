import React, { Component } from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className='navbar__logo'>
      <Link to='/content'>Grand Archive</Link>
    </div>
  );
};

export default Logo;
