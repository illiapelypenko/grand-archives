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
      <div className='header__menu'>
        <Link className='header__menu-item' to='/content/videos'>
          Videos
        </Link>
        <Link className='header__menu-item' to='/content/pictures'>
          Pictures
        </Link>
        <Link className='header__menu-item' to='/content/audios'>
          Audios
        </Link>
        <Link className='header__menu-item' to='/content/texts'>
          Texts
        </Link>
        {isAuth ? (
          <div className='header__menu-item' onClick={this.logout}>
            Log out
          </div>
        ) : (
          <Link className='header__menu-item' to='/auth/login'>
            Log in
          </Link>
        )}
      </div>
    );
  }
}
