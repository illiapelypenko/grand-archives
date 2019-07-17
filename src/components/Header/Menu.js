import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Menu extends Component {
  logout = () => {
    localStorage.removeItem("token");
    this.props.logout();
  };

  render() {
    const { isAuth } = this.props;
    return (
      <div className='navbar__menu'>
        <Link className='navbar__menu-item' to='/content/videos'>
          Videos
        </Link>
        <Link className='navbar__menu-item' to='/content/pictures'>
          Pictures
        </Link>
        <Link className='navbar__menu-item' to='/content/audios'>
          Audios
        </Link>
        <Link className='navbar__menu-item' to='/content/texts'>
          Texts
        </Link>
        {isAuth ? (
          <div className='navbar__menu-item' onClick={this.logout}>
            Log out
          </div>
        ) : (
          <Link className='navbar__menu-item' to='/auth/login'>
            Log in
          </Link>
        )}
      </div>
    );
  }
}
