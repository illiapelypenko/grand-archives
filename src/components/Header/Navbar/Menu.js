import React, { Component } from "react";
import { Link } from "react-router-dom";
import Signout from "../../../images/signout";
import Search from "./Search";

export default class Menu extends Component {
  state = {
    showLogout: false
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

  render() {
    const { isAuth, name } = this.props;
    return (
      <div className='navbar__menu'>
        <Search />
        <div className='navbar__menu-item-divider' />
        <Link className='navbar__menu-item' to='/content/all'>
          Content
        </Link>
        <div className='navbar__menu-item-divider' />
        <Link className='navbar__menu-item' to='/contacts'>
          Contacts
        </Link>
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
          <Link className='navbar__menu-item' to='/auth/login'>
            Log in
          </Link>
        )}
      </div>
    );
  }
}
