import React, { Component } from "react";
import { NavLink, Link, withRouter } from "react-router-dom";
import Signout from "./SignoutPic";

class Menu extends Component {
  state = {
    showLogout: false,
    showSubmenues: false
  };

  logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    this.setState(state => ({
      showLogout: !state.showLogout
    }));
    this.props.logout();
  };

  handleShowLogout = () => {
    this.setState(state => ({
      showLogout: !state.showLogout
    }));
  };

  handleSwitchSubmenu = () => {
    this.setState(state => ({ showSubmenues: !state.showSubmenues }));
  };

  handleSubmenuClick = name => {
    this.props.onSubmenuClick(name);
  };

  render() {
    const { isAuth, name, location } = this.props;
    const { showLogout, showSubmenues } = this.state;
    return (
      <div className='navbar__menu'>
        <div
          className='navbar__menu-item submenus-container'
          onMouseEnter={this.handleSwitchSubmenu}
          onMouseLeave={this.handleSwitchSubmenu}
        >
          <p
            className={`content-menu-item ${
              location.pathname === "/content" ? "active" : ""
            }`}
          >
            Content
          </p>
          {showSubmenues ? (
            <div className='submenus'>
              <p
                className='submenu'
                onClick={() => {
                  this.handleSubmenuClick("videos");
                }}
              >
                <Link to='/content'>Videos</Link>
              </p>
              <div className='vertical-line' />
              <p
                className='submenu'
                onClick={() => {
                  this.handleSubmenuClick("pictures");
                }}
              >
                <Link to='/content'>Pictures</Link>
              </p>
              <div className='vertical-line' />

              <p
                className='submenu'
                onClick={() => {
                  this.handleSubmenuClick("audios");
                }}
              >
                <Link to='/content'>Audios</Link>
              </p>
              <div className='vertical-line' />

              <p
                className='submenu'
                onClick={() => {
                  this.handleSubmenuClick("texts");
                }}
              >
                <Link to='/content'>Texts</Link>
              </p>
            </div>
          ) : null}
        </div>
        <div className='navbar__menu-item-divider' />
        <NavLink className='navbar__menu-item' exact to='/contacts'>
          Contacts
        </NavLink>
        <div className='navbar__menu-item-divider' />
        {isAuth ? (
          <div className='navbar__user-item'>
            <div className='navbar__user-icon' onClick={this.handleShowLogout}>
              {name[0]}
            </div>
            {showLogout ? (
              <div className='navbar__user-menu-item'>
                <div className='navbar__logout-icon' onClick={this.logout}>
                  <Signout />
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          <NavLink
            activeClassName='active'
            className='navbar__menu-item'
            exact
            to='/auth'
          >
            Log in
          </NavLink>
        )}
      </div>
    );
  }
}

export default withRouter(Menu);
