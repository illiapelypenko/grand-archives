import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Menu extends Component {
  state = {
    showLogout: false
  };

  logout = () => {
    localStorage.removeItem("token");
    this.props.logout();
  };

  handleShowLogout = () => {
    this.setState(state => ({
      showLogout: !state.showLogout
    }));
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
          <div className='navbar__user-item'>
            <div className='navbar__user-icon' onClick={this.handleShowLogout}>
              {"T"[0]}
            </div>
            {this.state.showLogout ? (
              <div className='navbar__user-menu-item' onClick={this.logout}>
                <div className='navbar__menu-item'>Log out</div>
              </div>
            ) : null}
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
