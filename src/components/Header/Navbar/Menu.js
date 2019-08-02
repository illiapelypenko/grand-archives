import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import Signout from "./SignoutPic";
import "./Menu.scss";
import Submenus from "./Submenus";

class Menu extends Component {
  state = {
    showLogout: false,
    showSubmenus: false
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

  handleSubmenuClick = (e, name) => {
    this.props.onSubmenuClick(name);
  };

  handleShowSubmenus = e => {
    this.setState(state => ({
      showSubmenus: true
    }));
  };

  handleHideSubmenus = e => {
    this.setState(state => ({
      showSubmenus: false
    }));
  };

  render() {
    const { isAuth, name, location } = this.props;
    const { showLogout, showSubmenus } = this.state;
    return (
      <div className='navbar__menu'>
        <div className='navbar__menu-item submenus-container'>
          <p
            className={`content-menu-item ${
              location.pathname === "/content" ? "active" : ""
            }`}
            onMouseEnter={this.handleShowSubmenus}
            onMouseLeave={this.handleHideSubmenus}
          >
            Content
          </p>
          <Submenus
            onSubmenuClick={this.handleSubmenuClick}
            showSubmenus={showSubmenus}
          />
        </div>
        <div className='navbar__menu-item-divider' />
        <NavLink className='navbar__menu-item' exact to='/contacts'>
          Contacts
        </NavLink>
        <div className='navbar__menu-item-divider' />

        {/* Auth */}
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
