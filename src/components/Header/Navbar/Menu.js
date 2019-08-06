import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import Signout from "./SignoutPic";
import "./Menu.scss";
import { Link } from "react-router-dom";

// dropdown menu doesn's work over iframe(map) (no fix)

class Menu extends Component {
  state = {
    showLogout: false,
    showSubmenu: false
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
    this.props.showLogout();
    this.setState(state => ({
      showLogout: !state.showLogout
    }));
  };

  handleSubmenuClick = (e, name) => {
    e.stopPropagation();
    this.setState(state => ({
      showSubmenu: false
    }));
    this.props.onSubmenuClick(name);
  };

  showSubmenu = e => {
    console.log("!");
    this.setState(state => ({
      showSubmenu: true
    }));
  };

  hideSubmenu = e => {
    this.setState(state => ({
      showSubmenu: false
    }));
  };

  render() {
    const { isAuth, name, location, showSelf } = this.props;
    const { showLogout, showSubmenu } = this.state;

    return (
      <div className={`menu ${showSelf ? "" : "hidden"}`}>
        <div
          className={`menu__item ${
            location.pathname === "/content" ? "active" : ""
          } ${showSubmenu ? "hovered" : ""}`}
          onTouchStart={this.showSubmenu}
          onMouseEnter={this.showSubmenu}
          onMouseLeave={this.hideSubmenu}
        >
          <p>Content</p>
          <div className={`submenu ${showSubmenu ? "" : "hidden"}`}>
            <Link
              className='submenu__item'
              onClick={e => this.handleSubmenuClick(e, "videos")}
              to='/content'
            >
              Videos
            </Link>
            <div className='submenu__item-divider' />
            <Link
              className='submenu__item'
              onClick={e => this.handleSubmenuClick(e, "pictures")}
              to='/content'
            >
              Pictures
            </Link>
            <div className='submenu__item-divider' />
            <Link
              className='submenu__item'
              onClick={e => this.handleSubmenuClick(e, "audios")}
              to='/content'
            >
              Audios
            </Link>
            <div className='submenu__item-divider' />
            <Link
              className='submenu__item'
              onClick={e => this.handleSubmenuClick(e, "texts")}
              to='/content'
            >
              Text
            </Link>
          </div>
        </div>
        <div className='menu__item-divider' />

        <NavLink className='menu__item' exact to='/contacts'>
          Contacts
        </NavLink>
        <div className='menu__item-divider' />

        {isAuth ? (
          <div className='menu__user'>
            <div className='menu__user-icon' onClick={this.handleShowLogout}>
              {name[0]}
            </div>
            {showLogout ? (
              <div className='menu__user-menu'>
                <div className='menu__logout-icon' onClick={this.logout}>
                  <Signout />
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          <NavLink className='menu__item' exact to='/auth'>
            Log in
          </NavLink>
        )}
      </div>
    );
  }
}

export default withRouter(Menu);
