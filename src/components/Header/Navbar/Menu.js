import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Signout from "./SignoutPic";

export default class Menu extends Component {
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

  handleMouseEnterOnContent = () => {
    this.setState(state => ({ showSubmenues: !state.showSubmenues }));
  };

  handleMouseLeaveOnContent = () => {
    this.setState(state => ({ showSubmenues: !state.showSubmenues }));
  };

  handleSubmenuClick = name => {
    this.props.onSubmenuClick(name);
  };

  render() {
    const { isAuth, name, width } = this.props;
    return (
      <div className='navbar__menu'>
        {/* <NavLink className='navbar__menu-item' exact to='/content'>
          Content
        </NavLink> */}
        <div
          className='navbar__menu-item submenus-container'
          onMouseEnter={this.handleMouseEnterOnContent}
          onMouseLeave={this.handleMouseLeaveOnContent}
        >
          Content
          {this.state.showSubmenues ? (
            <div className='submenus'>
              <p
                className='submenu'
                onClick={() => {
                  this.handleSubmenuClick("videos");
                }}
              >
                Videos
              </p>
              <p
                className='submenu'
                onClick={() => {
                  this.handleSubmenuClick("pictures");
                }}
              >
                Pictures
              </p>
              <p
                className='submenu'
                onClick={() => {
                  this.handleSubmenuClick("audios");
                }}
              >
                Audios
              </p>
              <p
                className='submenu'
                onClick={() => {
                  this.handleSubmenuClick("texts");
                }}
              >
                Texts
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
            {this.state.showLogout ? (
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
