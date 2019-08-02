import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import Signout from "./SignoutPic";
import "./NewMenu.scss";
import { Link } from "react-router-dom";

// dropdown menu doesn's work over iframe(map) (no fix)

class NewMenu extends Component {
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
    this.setState(state => ({
      showLogout: !state.showLogout
    }));
  };

  handleSubmenuClick = e => {
    e.stopPropagation();
    this.props.onSubmenuClick(e, "pictures");
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
    const { isAuth, name, location, onSubmenuClick, showSelf } = this.props;
    const { showLogout, showSubmenu } = this.state;

    return (
      <div className={`menu ${showSelf ? "" : "hidden"}`}>
        <div
          className='menu__item'
          onTouchStart={this.showSubmenu}
          onMouseEnter={this.showSubmenu}
          onMouseLeave={this.hideSubmenu}
        >
          <p>Content</p>
          <div className={`submenu ${showSubmenu ? "" : "hidden"}`}>
            <Link
              className='submenu__item'
              onClick={this.handleSubmenuClick}
              to='/content'
            >
              Pictures
            </Link>
          </div>
        </div>
        <NavLink className='menu__item' exact to='/contacts'>
          Contacts
        </NavLink>
        <NavLink className='menu__item' exact to='/auth'>
          Log in
        </NavLink>
      </div>
    );
  }
}

export default withRouter(NewMenu);
