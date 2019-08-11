import React, { useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import Signout from "./SignoutPic";
import "./Menu.scss";
import { Link } from "react-router-dom";

const Menu = ({
  showLogout: onShowLogout,
  logout,
  onSubmenuClick,
  isAuth,
  name,
  location,
  showSelf
}) => {
  const [showLogout, setShowLogout] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);

  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setShowLogout(!showLogout);
    logout();
  };

  const handleShowLogout = () => {
    onShowLogout();
    setShowLogout(!showLogout);
  };

  const handleSubmenuClick = (e, name) => {
    e.stopPropagation();
    setShowSubmenu(false);
    onSubmenuClick(name);
  };

  const onShowSubmenu = e => {
    setShowSubmenu(true);
  };

  const onHideSubmenu = e => {
    setShowSubmenu(false);
  };

  return (
    <div className={`menu ${showSelf ? "" : "hidden"}`}>
      <div
        className={`menu__item ${
          location.pathname === "/content" ? "active" : ""
        } ${showSubmenu ? "hovered" : ""}`}
        onTouchStart={onShowSubmenu}
        onMouseEnter={onShowSubmenu}
        onMouseLeave={onHideSubmenu}
      >
        <p>Content</p>
        <div className={`submenu ${showSubmenu ? "" : "hidden"}`}>
          <Link
            className='submenu__item'
            onClick={e => handleSubmenuClick(e, "videos")}
            to='/content'
          >
            Videos
          </Link>
          <div className='submenu__item-divider' />
          <Link
            className='submenu__item'
            onClick={e => handleSubmenuClick(e, "pictures")}
            to='/content'
          >
            Pictures
          </Link>
          <div className='submenu__item-divider' />
          <Link
            className='submenu__item'
            onClick={e => handleSubmenuClick(e, "audios")}
            to='/content'
          >
            Audios
          </Link>
          <div className='submenu__item-divider' />
          <Link
            className='submenu__item'
            onClick={e => handleSubmenuClick(e, "texts")}
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
          <div className='menu__user-icon' onClick={handleShowLogout}>
            {name[0]}
          </div>
          {showLogout ? (
            <div className='menu__user-menu'>
              <div className='menu__logout-icon' onClick={onLogout}>
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
};

export default withRouter(Menu);
